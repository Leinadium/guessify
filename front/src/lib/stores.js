import { readable, writable } from "svelte/store";
import SpotifyWebApi from "spotify-web-api-js";

// game loop
export const isPlaying = writable(false);

// spotify handlers
export const spotifyAPIHandler = writable(new SpotifyWebApi());