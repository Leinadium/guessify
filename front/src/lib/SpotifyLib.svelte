<script>
    // Based on code from https://stackoverflow.com/questions/59629947/how-do-i-load-an-external-js-library-in-svelte-sapper
    import { onMount, createEventDispatcher } from "svelte";

    const src = "https://sdk.scdn.co/spotify-player.js";
    const dispatch = createEventDispatcher();
    let script;

    onMount(() => {
        if (window && typeof window["onSpotifyWebPlaybackSDKReady"] !== "undefined") {
            return dispatch("loaded");
        }
        script.addEventListener("load", () => {
            console.log("load event from script");
            dispatch("loaded");
        });
        script.addEventListener("error", (event) => {
            console.error("something went wrong", event);
            dispatch("error");
        });
    });
</script>

<svelte:head>
    <script bind:this={script} {src}>
    </script>
</svelte:head>