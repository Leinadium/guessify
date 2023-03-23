from . import api_blueprint

import requests
from os import getenv
from base64 import b64encode
from urllib.parse import urlencode, quote
from flask import session, request, redirect, make_response

COOKIE_REFRESH = "guessify:refresh"
SPOTIFY_AUTHORIZE = "https://accounts.spotify.com/authorize"
SPOTIFY_TOKEN = "https://accounts.spotify.com/api/token"

SECRET = b64encode(
    f"{getenv('CLIENT_ID')}:{getenv('CLIENT_SECRET')}".encode()
).decode() 

# https://github.com/spotify/web-playback-sdk/issues/11#issuecomment-609160530
# TODO: verificar quais escopos sao realmente necessarios
scope = "user-read-playback-state user-modify-playback-state user-read-currently-playing "  \
        "app-remote-control streaming user-read-email user-read-private user-library-read " \
        "playlist-read-private playlist-read-collaborative "


@api_blueprint.route("/auth", methods=["GET"])
def auth():
    """First endpoint for authentication"""
    args = {
        "client_id": getenv("SPOTIPY_CLIENT_ID"),
        "response_type": "code",
        "redirect_uri": "http://localhost:5000/cb",
        "scope": scope,
        "show_dialog": False
    }
    return redirect(f"{SPOTIFY_AUTHORIZE}?{urlencode(args)}")


@api_blueprint.route("/cb", methods=["GET"])
def callback():
    return redirect(f"http://localhost:5173?{urlencode(request.args)}")

    # if "code" in request.args:
    #     return "<h1>Authenticated</h1>"
    # elif "error" in request.args:
    #     return "<h1>Error</h>"
    # else:
    #     return "<h3>Unknown error</h3>"


@api_blueprint.route("/get_refresh/<code>", methods=["GET"])
def refresh(code: str):
    payload = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": "http://localhost:5000/cb"
    }

    headers = {
        "Authorization": f"Basic {SECRET}",
        "Content-Type": "application/x-www-form-urlencoded"
    }

    r = requests.post(
        url=SPOTIFY_TOKEN,
        params=payload,
        headers=headers
    )

    if r.status_code == 200:
        parsed = r.json()
        return {
            "access_token": parsed["access_token"],
            "refresh_token": parsed["refresh_token"] 
        }, 200
    else:
        # error / error_description
        return r.json(), r.status_code


@api_blueprint.route("/get_access/<refresh>", methods=["GET"])
def access(refresh: str):
    payload = {
        "grant_type": "refresh_token",
        "refresh_token": refresh
    }
    headers = {
        "Authorization": f"Basic {SECRET}",
        "Content-Type": "application/x-www-form-urlencoded"
    }

    r = requests.post(
        url=SPOTIFY_TOKEN,
        params=payload,
        headers=headers
    )

    if r.status_code == 200:
        parsed = r.json()
        return {
            "access_token": parsed["access_token"],
            "refresh_token": parsed.get("refresh_token")    # might not be
        }
    else:
        return r.json(), r.status_code
