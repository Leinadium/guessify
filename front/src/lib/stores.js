import { readable, writable } from "svelte/store";
import { REFRESH_KEY, VOLUME_KEY } from "./utils";
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

// refresh and access token is valid
export const isAuthValid = writable(false);

// spotify username
export const username = writable(null);

// game score
export const gameScore = writable(0);

// volume
const volumeStored = parseFloat(localStorage.getItem(VOLUME_KEY)) || 0.7;
export const volume = writable(volumeStored);
volume.subscribe((v) => localStorage.setItem(VOLUME_KEY, v.toString()));
