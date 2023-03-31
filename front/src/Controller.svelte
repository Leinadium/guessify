<script>
    import { refreshToken, accessToken, spotifyAPIHandler, username, isAuthValid } from "./lib/stores";
    import LoadAuth from "./lib/LoadAuth.svelte";
    import GamePlay from "./game/GamePlay.svelte";
    import LandingContent from "./landing/LandingContent.svelte";
    import PreGameScreen from "./pregame/PreGameScreen.svelte";

    let currentMode = "landing";    // landing | pregame | game
    let nextMode = currentMode;

    let playlistId = "1Hno5OKWwHag0fuRBrXzWL";
    
    let gameInfo = {
        score: 0,
        maxRounds: 7,
        musicPlaylist: [],  // to be filled
        playlistUri: ""     // to be filled
    }

    function goToSelection() {
        if ($refreshToken && $accessToken) {
            $spotifyAPIHandler.setAccessToken($accessToken);
            nextMode = "pregame";
            currentMode = "";
        }
    }

    function resetAll() {
        $refreshToken = null;
        $username = null;
        $isAuthValid = null;
        goToLanding();
    }

    function goToLanding() {
        nextMode = "landing";
        currentMode = nextMode;
    }

    function update() {
        currentMode = nextMode;
    }

</script>

<LoadAuth />

{#if currentMode === "landing"}
    <LandingContent 
        on:ready={goToSelection}
        on:reset={resetAll}
        on:outroend={update}
    />

{:else if currentMode === "pregame"}
    <PreGameScreen 
        on:reset={goToLanding}   
    />

{:else if currentMode === "game"}
    <GamePlay 
        playlistId={playlistId} 
        gameInfo={gameInfo}
    />

{/if}