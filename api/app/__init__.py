from flask import Flask
from os.path import exists
from dotenv import load_dotenv


def create_app():
    if exists(".env"):
        load_dotenv()

    app = Flask(__name__)

    from .auth import api_blueprint
    app.register_blueprint(api_blueprint)

    return app