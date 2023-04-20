use std::env;
use base64::{engine::general_purpose, Engine};

// spotify api
pub const SPOTIFY_AUTHORIZE: &'static str = "https://accounts.spotify.com/authorize";
pub const SPOTIFY_TOKEN: &'static str = "https://accounts.spotify.com/api/token";

// spotify scopes
pub const SPOTIFY_SCOPES: &str = "user-read-playback-state user-modify-playback-state \
user-read-currently-playing app-remote-control streaming \
user-read-email user-read-private user-library-read \
playlist-read-private playlist-read-collaborative ";

// env vars
#[derive(Debug, Clone)]
pub struct EnvVars {
    pub client_id: String,
    pub client_secret: String,
    pub front_url: String,
    pub api_url: String,
    pub secret_b64: String,
}

impl EnvVars {
    pub fn new() -> Self {
        let mut ret = EnvVars {
            client_id: env::var("CLIENT_ID").expect("CLIENT_ID not found"),
            client_secret: env::var("CLIENT_SECRET").expect("CLIENT_SECRET not found"),
            front_url: env::var("FRONT_URL").expect("FRONT_URL not found"),
            api_url: env::var("API_URL").expect("API_URL not found"),
            secret_b64: "".to_string(),
        };
        ret.secret_b64 = general_purpose::STANDARD.encode(
            format!("{}:{}", ret.client_id, ret.client_secret).as_bytes()
        );
        ret
    }
}




