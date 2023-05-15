use crate::structs::*;
use crate::consts::*;

use serde_json;
use serde_urlencoded;
use actix_web::{
    get, web::{Query, Redirect, Path, Data}, Responder,
    HttpResponse, http::StatusCode
};
use reqwest;
use reqwest::Response;


/// First endpoint for authentication
#[get("/auth")]
pub async fn auth(env: Data<EnvVars>) -> impl Responder {
    let args = AuthArgs {
        client_id: env.client_id.clone(),
        response_type: "code".to_string(),
        redirect_uri: format!("{}/cb", env.api_url),
        scope: SPOTIFY_SCOPES.to_string(),
        show_dialog: true,
    };

    let args_str = serde_urlencoded::to_string(args).unwrap();

    Redirect::to(format!("{}?{}", SPOTIFY_AUTHORIZE, args_str))
        .using_status_code(StatusCode::FOUND)
}

/// Callback route (redirect to front)
#[get("/cb")]
pub async fn redirect_to_front(env: Data<EnvVars>, args: Query<SpotifyCallback>) -> impl Responder {
    // parses back to string and redirect to front
    // if back and front are integrated, can be only a simple html text with no args parsing

    let args_str = serde_urlencoded::to_string(args.into_inner()).unwrap();
    Redirect::to(format!("{}?{}", env.front_url, args_str))
        .using_status_code(StatusCode::FOUND)
}

async fn parse_spotify(r: Response) -> Result<SpotifyTokens, SpotifyError> {
    let res_text = match r.text().await {
        Ok(t) => t,
        Err(e) => {
            println!("Error parsing body from spotify: {}", e);
            return Err(SpotifyError {
                error: "Invalid response from spotify".to_string(),
                error_description: "Error parsing body from spotify: empty body".to_string(),
            });
        }
    };

    if let Ok(err) = serde_json::from_str::<SpotifyError>(&res_text) {
        println!("Error retrieving tokens from spotify: {:?}", err);
        return Err(err);
    }

    // checking for sucess
    match serde_json::from_str::<SpotifyTokens>(&res_text) {
        Ok(tokens) => {
            Ok(tokens)
        },
        // neither spotifyError nor SpotifyTokens
        Err(e) => {
            println!("Error parsing tokens return: {}", e);
            Err(SpotifyError {
                error: "internal_server_error".to_string(),
                error_description: "Error parsing tokens return".to_string(),
            })
        }
    }
}

/// Get new refresh token with spotify api
#[get("/get_refresh/{code}")]
pub async fn get_refresh(env: Data<EnvVars>, path: Path<SpotifyCallback>) -> impl Responder {
    let code: String = path.code.clone();

    let args = SpotifyGetRefresh {
        code,
        grant_type: "authorization_code".to_string(),
        redirect_uri: format!("{}/cb", env.api_url),
    };
    let client = reqwest::Client::new();
    let res = client.post(SPOTIFY_TOKEN)
        .header("Content-Type", "application/x-www-form-urlencoded")
        .header("Authorization", format!("Basic {}", env.secret_b64))
        .form(&args)
        .send()
        .await;

    return if let Ok(res) = res {
        match parse_spotify(res).await {
            Ok(tokens) => HttpResponse::Ok().json(tokens),
            Err(err) => HttpResponse::InternalServerError().json(err)
        }
    } else {
        println!("Error retrieving new refresh token from spotify: {:?}", res);
        HttpResponse::InternalServerError().finish()
    }
}

/// Get new access token from refresh token
#[get("/get_access/{refresh}")]
pub async fn get_access(env: Data<EnvVars>, path: Path<Refresh>) -> impl Responder {
    let refresh: String = path.refresh.clone();

    let args = SpotifyGetAccess {
        grant_type: "refresh_token".to_string(),
        refresh_token: refresh,
    };

    let client = reqwest::Client::new();
    let res = client.post(SPOTIFY_TOKEN)
        .header("Content-Type", "application/x-www-form-urlencoded")
        .header("Authorization", format!("Basic {}", env.secret_b64))
        .form(&args)
        .send()
        .await;

    return if let Ok(res) = res {
        match parse_spotify(res).await {
            Ok(tokens) => HttpResponse::Ok().json(tokens),
            Err(err) => HttpResponse::InternalServerError().json(err)
        }
    } else {
        println!("Error retrieving access tokens from spotify: {:?}", res);
        HttpResponse::InternalServerError().finish()
    }
}

/// Simple not found view
pub async fn not_found() -> impl Responder {
    HttpResponse::NotFound().finish()
}