import { writable } from "svelte/store";

export const isLoggedIn = writable(false);
export const isPlaying = writable(false);

// id of music submitted
export const musicSubmitted = writable(-1);