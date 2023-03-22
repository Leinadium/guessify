import { readable, writable } from "svelte/store";
import { REFRESH_KEY } from "./utils";
import SpotifyWebApi from "spotify-web-api-js";

// game loop
export const isPlaying = writable(false);

// spotify handler
export const spotifyAPIHandler = writable(new SpotifyWebApi());

// refresh token
const stored = localStorage.getItem(REFRESH_KEY);
export const refreshToken = writable(stored)
refreshToken.subscribe((v) => localStorage.setItem(REFRESH_KEY, v));

// access token
export const accessToken = writable(null);