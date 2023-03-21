<script>
    import { spotifyAPIHandler } from "./lib/stores";
    import { onMount } from "svelte";
    import GamePlay from "./game/GamePlay.svelte";
    import LandingContent from "./LandingContent.svelte";

    // TODO: load access_token from somewhere other than url
    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const access_token = urlParams.get("token");
        $spotifyAPIHandler.setAccessToken(access_token);
    })

</script>

<GamePlay />