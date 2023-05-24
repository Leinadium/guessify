# Guessify

Repository for the game Guessify, available at [guessify.me](https://guessify.me).

This is game is currently not available to everyone, as I currently don't have permission to publish the app  
([Spotify Policy III.2](https://developer.spotify.com/policy)), but I'm working on it.

This game was created to practice my frontend skills, as I had none prior to this. The game was made using Svelte and served using Github Pages.

The frontend is where all the game logic is contained, and the backend has the purpose of providing authentication for the game.

## How to run

### Front

Edit the `front/src/lib/utils.js` file and change the URL constants:

```js
const API_URL = "your.api.endpoint.com";
export const FRONT_URL = "your.front.endpoint.com";
// ...
```

Install requirements and run as dev:

```bash
cd front
npm install
npm run dev
```

### API

#### Flask (Python)

At first, the API was a simple Flask application (available at `api/`).

Edit the `api/.env`:

```text
CLIENT_ID = "YOUR_CLIENT_ID"
CLIENT_SECRET = "YOUR_CLIENT_SECRET"
API_URL = "your.api.endpoint.com"
FRONT_URL = "your.front.endpoint.com"
```

Install requirements and run as dev:

```bash
cd api
python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt
flask run
```

#### Actix (Rust)

In order to create a more robust backend, and also practice my Rust skills, there is an API written in Rust available at `server/`.

Compile the project:

```bash
cd server
cargo build --release
```

Create an .env file and copy to the same folder as the binary application, and then run the application.

```text
CLIENT_ID = "YOUR_CLIENT_ID"
CLIENT_SECRET = "YOUR_CLIENT_SECRET"
API_URL = "your.api.endpoint.com"
FRONT_URL = "your.front.endpoint.com"
```

## Known problems

* Sometimes, the game autosubmits/skips the music when the game page is loaded
