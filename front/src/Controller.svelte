<script>
    import { refreshToken, accessToken, spotifyAPIHandler, username, isAuthValid } from "./lib/stores";
    import LoadAuth from "./lib/LoadAuth.svelte";
    import GamePlay from "./game/GamePlay.svelte";
    import LandingContent from "./landing/LandingContent.svelte";
    import PreGameScreen from "./pregame/PreGameScreen.svelte";

    let currentMode = "landing";    // landing | pregame | game

    let playlistId = "1szWU1SGQwoqnEHwkXUDGH";
    let gameInfo = {
        score: 0,
        maxRounds: 7,
        musicPlaylist: [],  // to be filled
        playlistUri: ""     // to be filled
    }

    function goToSelection() {
        if ($refreshToken && $accessToken) {
            $spotifyAPIHandler.setAccessToken($accessToken);
            currentMode = "pregame"    // TODO: selection
        }
    }

    function resetAll() {
        $refreshToken = null;
        $username = null;
        $isAuthValid = null;
        goToLanding();
    }

    function goToLanding() {
        currentMode = "landing";
    }

</script>

<LoadAuth />

{#if currentMode == "landing"}
    <LandingContent 
        on:ready={goToSelection}
        on:reset={resetAll}
    />

{:else if currentMode == "pregame"}
    <PreGameScreen />

{:else}
    <GamePlay 
        playlistId={playlistId} 
        gameInfo={gameInfo}
    />

{/if}