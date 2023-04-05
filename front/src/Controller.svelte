<script>
    import { refreshToken, accessToken, spotifyAPIHandler, username, isAuthValid } from "./lib/stores";
    import LoadAuth from "./lib/LoadAuth.svelte";
    import GamePlay from "./game/GamePlay.svelte";
    import LandingContent from "./landing/LandingContent.svelte";
    import PreGameScreen from "./pregame/PreGameScreen.svelte";

    let currentMode = "landing";    // landing | pregame | game
    let nextMode = currentMode;
    
    let gameInfo = {
        score: 0,
        maxRounds: 5,
        content: {}
    }

    function goToSelection() {
        if ($refreshToken && $accessToken) {
            $spotifyAPIHandler.setAccessToken($accessToken);
            nextMode = "pregame";
            currentMode = "";
        }
    }

    function goToGame(event) {
        gameInfo = {
            score: 0,
            maxRounds: 5,
            content: event.detail.content
        }
        console.log(gameInfo.content);
        nextMode = "game";
        currentMode = "";
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
        on:submit={goToGame}
        on:outroend={update}   
    />

{:else if currentMode === "game"}
    <GamePlay 
        gameInfo={gameInfo}
    />

{/if}