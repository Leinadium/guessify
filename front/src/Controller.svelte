<script>
    import { refreshToken, accessToken, spotifyAPIHandler } from "./lib/stores";
    import GamePlay from "./game/GamePlay.svelte";
    import LandingContent from "./LandingContent.svelte";

    let currentMode = "landing";    // landing | selection | game

    let playlistId = "37i9dQZF1DZ06evO4bbJPq";
    let gameInfo = {
        score: 0,
        maxRounds: 7,
        musicPlaylist: [],  // to be filled
        playlistUri: ""     // to be filled
    }

    function goToSelection() {
        if ($refreshToken && $accessToken) {
            $spotifyAPIHandler.setAccessToken($accessToken);
            currentMode = "game"    // TODO: selection
        }
    }

</script>

{#if currentMode == "landing"}
    <LandingContent 
        on:refresh={goToSelection}
    />

{:else if currentMode == "selection"}
    <!-- TODO: Selection -->

{:else}
    <GamePlay 
        playlistId={playlistId} 
        gameInfo={gameInfo}
    />

{/if}