<script>
    /* 
        Events dispatched:
            error: {text: str}
                -> some error occured
            loaded: {} 
                -> the sdk has loaded
            ready: {}
                -> the sdk has control
            notReady: {}
                -> the sdk has lost control
            state: {WebPlaybackState}
                -> the state has updated (or not)
                -> https://developer.spotify.com/documentation/web-playback-sdk/reference/#object-web-playback-state
    */
    // Based on code from https://stackoverflow.com/questions/59629947/how-do-i-load-an-external-js-library-in-svelte-sapper
    import { accessToken } from "./stores";
    import { onMount, createEventDispatcher, onDestroy } from "svelte";

    export let spotifyPlayer = undefined;
    export let deviceId = undefined;
    
    const src = "https://sdk.scdn.co/spotify-player.js";
    const dispatch = createEventDispatcher();
    let script;

    
    window['onSpotifyWebPlaybackSDKReady'] = () => {
        if (spotifyPlayer === undefined) {
            // @ts-ignore
            spotifyPlayer = new window.Spotify.Player({
                name: 'Guessify Player #' + Math.floor(Math.random() * 1000000),
                getOAuthToken: cb => { cb($accessToken); },
                volume: 0.7
            });

            spotifyPlayer.addListener('ready', (args) => {
                deviceId = args.device_id;
                console.log("Ready with device id: ", deviceId);
                dispatch('ready', {});
            });

            spotifyPlayer.addListener('not_ready', (args) => {
                console.log("Device id is not ready: ", args.device_id );
                dispatch('notReady', {});
            });

            spotifyPlayer.addListener('player_state_changed', (args) => {
                console.log("Player state has changed: ", args);
                dispatch('state', args);
            });

            spotifyPlayer.on('initialization_error', ({ message }) => {
                console.error("Initialization error");
                dispatch('error', {
                    "text": "Error at Spotify Player SDK. Does your browser support EME protection?\n: " + message
                });
            });

            spotifyPlayer.on('authentication_error', ({ message }) => {
                console.error("Authentication error");
                dispatch('error', {
                    "text": "Failed to authenticate with Spotify: " + message
                });
            });

            spotifyPlayer.on("account_error", ({ message }) => {
                console.error("Account error");
                dispatch("error", {
                    "text": "Failed to validate Spotify account. Guessify only supports Spotify Premium accounts\n" + message
                });
            });

            spotifyPlayer.on("playback_error", ({ message }) => {
                console.error("playback error");
                dispatch("error", {
                    "text": "Failed to perform playback: " + message
                });
            });
            
            spotifyPlayer.connect();
        }
    }

    onMount(() => {
        if (window && typeof window["onSpotifyWebPlaybackSDKReady"] !== "undefined") {
            // startPlayer();
            return dispatch("loaded", {});
        }
        script.addEventListener("load", () => {
            console.log("load event from script");
            // startPlayer();
            dispatch("loaded", {});
        });
        script.addEventListener("error", (event) => {
            console.error("something went wrong", event);
            dispatch("error", {
                "text": "Error loading Spotify Player SDK"
            });
        });
    });

    onDestroy(() => {
        if (spotifyPlayer != undefined) {
            console.log("Disconnecting");
            spotifyPlayer.disconnect();
        }
    });
</script>

<svelte:head>
    <script bind:this={script} {src}></script>
</svelte:head>