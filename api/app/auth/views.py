from . import api_blueprint

import spotipy
from os import environ, urandom
from flask import session, request, redirect

# https://github.com/spotify/web-playback-sdk/issues/11#issuecomment-609160530
# TODO: verificar quais escopos sao realmente necessarios
scope = "user-read-playback-state user-modify-playback-state user-read-currently-playing"  \
        "app-remote-control streaming user-read-email user-read-private user-library-read" \
        "playlist-read-private playlist-read-collaborative"

# TODO: importar variaveis diretamente de um .env
environ['SPOTIPY_CLIENT_ID'] = ''
environ['SPOTIPY_CLIENT_SECRET'] = ''
environ['SPOTIPY_REDIRECT_URI'] = ''



@api_blueprint.route("/", methods=["GET", "POST"])
def index():
    """Faz a autenticacao do usuario com o spotify"""

    # faz o cache usando a sessao do Flask
    cache_handler = spotipy.cache_handler.FlaskSessionCacheHandler(session)
    # faz a autenticacao usando as variaveis definidas
    auth_manager = spotipy.oauth2.SpotifyOAuth(scope=scope,
                                               cache_handler=cache_handler,
                                               show_dialog=True)
    
    # a autenticacao é separada em tres partes:
    # parte 1: nao esta logado ou autorizado. redireciona pro spotify
    if not auth_manager.validate_token(cache_handler.get_cached_token()):
        auth_url = auth_manager.get_authorize_url()
        return redirect(auth_url)

    # parte 2: autorizado pelo spotify, agora pega os tokens
    if "code" in request.args:
        auth_manager.get_access_token(request.args.get('code'))

    # parte 3: logado. vai para o jogo
    token: dict = session.get("token_info")
    access_token = token.get('access_token')
    return redirect(f'http://localhost:5173?token={access_token}')

