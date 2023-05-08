mod consts;
mod views;
mod structs;

use crate::consts::*;
use dotenv::dotenv;
use actix_web::{App, HttpServer, web::{self, Data}, middleware::Logger};
use actix_cors::Cors;
use actix_files as fs;
use env_logger;


#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    env_logger::init_from_env(env_logger::Env::default().default_filter_or("info"));

    println!("Running on http://localhost:8080");

    HttpServer::new(|| {
        // TODO: more restrict CORS
        // may not be needed when front and back are integrated
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header();

        App::new()
            .wrap(cors)
            .wrap(Logger::default())
            .app_data(Data::new(EnvVars::new()))
            .service(views::auth)
            .service(views::redirect_to_front)
            .service(views::get_refresh)
            .service(views::get_access)
            .default_service(web::to(views::not_found))

    }).bind(("0.0.0.0", 8080))?.run().await
}

