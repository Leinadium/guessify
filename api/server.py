import spotipy
from os import environ, urandom
from flask import Flask, session, request, redirect

# https://github.com/spotify/web-playback-sdk/issues/11#issuecomment-609160530
scope = "user-read-playback-state user-modify-playback-state user-read-currently-playing " \
        "app-remote-control streaming " \
        "user-read-email user-read-private " \
        "user-library-read " \
        "playlist-read-private playlist-read-collaborative "

environ['SPOTIPY_CLIENT_ID'] = ''
environ['SPOTIPY_CLIENT_SECRET'] = ''
environ['SPOTIPY_REDIRECT_URI'] = ''


app = Flask(__name__)
app.config['SECRET_KEY'] = urandom(64)


@app.route("/", methods=["GET", "POST"])
def index():
    print(session.get('token_info'))

    cache_handler = spotipy.cache_handler.FlaskSessionCacheHandler(session)
    auth_manager = spotipy.oauth2.SpotifyOAuth(scope=scope,
                                               cache_handler=cache_handler,
                                               show_dialog=True)
    if "code" in request.args:
        # step 2: autorizado, falta pegar o access_token e o refresh_token
        auth_manager.get_access_token(request.args.get('code'))
        return redirect('/')

    if not auth_manager.validate_token(cache_handler.get_cached_token()):
        # step 1: nao esta logado ou autorizado da sessao
        auth_url = auth_manager.get_authorize_url()
        return f'<a href="{auth_url}">Login</a>'

    # step 3: logado
    # sp = spotipy.Spotify(auth_manager=auth_manager)
    token: dict = session.get('token_info')
    return redirect(f'http://localhost:5173?token={token.get("access_token")}')


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
