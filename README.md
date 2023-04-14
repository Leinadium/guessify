# Guessify

Repository for the game Guessify, available at [TODO](https://github.com/Leinadium/guessify)

## Run

### Front

Edit the `front/src/lib/utils.js` file and change the URL constants:

```js
const API_URL = "guessify.com/api";
const FRONT_URL = "guessify.com/";
```

Install requirements and run as dev:

```bash
cd front
npm install
npm run dev
```

### API

Edit the `api/.env`:

```text
CLIENT_ID = "YOUR_CLIENT_ID"
CLIENT_SECRET = "YOUR_CLIENT_SECRET"
API_URL = "guessify.com/api"
FRONT_URL = "guessify.com"
```

Install requirements and run as dev:

```bash
cd api
python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt
flask run
```

