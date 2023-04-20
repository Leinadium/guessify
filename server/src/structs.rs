use serde::{Deserialize, Serialize};

#[derive(Serialize)]
pub struct AuthArgs {
    pub client_id: String,
    pub response_type: String,
    pub redirect_uri: String,
    pub scope: String,
    // pub state: String,
    pub show_dialog: bool,
}

#[derive(Serialize, Deserialize)]
pub struct SpotifyCallback {
    pub code: String,
    // pub state: String,
}

#[derive(Serialize)]
pub struct SpotifyGetRefresh {
    pub grant_type: String,
    pub code: String,
    pub redirect_uri: String,
}

#[derive(Serialize)]
pub struct SpotifyGetAccess {
    pub grant_type: String,
    pub refresh_token: String,
}

#[derive(Deserialize, Serialize)]
pub struct SpotifyTokens {
    pub access_token: String,
    pub refresh_token: Option<String>,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct SpotifyError {
    pub error: String,
    pub error_description: String,
}

#[derive(Deserialize)]
pub struct Refresh {
    pub refresh: String
}