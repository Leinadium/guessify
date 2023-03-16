<script>
    import SpotifyLib from "../lib/SpotifyLib.svelte";
    import PlayScreen from "./screen/PlayScreen.svelte";
    import ReadyScreen from "./screen/ReadyScreen.svelte";
    import StartScreen from "./screen/StartScreen.svelte";
    import { spotifyAPIHandler, isPlaying } from "../lib/stores"
    import GameTick from "../lib/GameTick.svelte";
    import { onMount } from "svelte";

    const DEFAULT_INTERVAL = 100;   // ms to update track size

    export let gameInfo = {
        score: 0,           // total score of all rounds combined
        maxRounds: 5,       // number of rounds to be played
        musicPlaylist: [],  // playlist
    }

    export let playlistId = "0iNMRyWOtsnUGoOHqhgOne";   

    let currentInfo = {
        state: "start",     // possible states: [start, game, ready, end, error]
        round: 0,           // current round of the game
        musicIndex: -1,     // index of the current playing music
        musicInfo: {},      // info of the current playing music
        roundScore: -1,     // score of the current round
        playedMs: -1,       // total milliseconds of music played
    } 

    let gameStatus = {
        canStart: false,    // every lib has been loaded and ready
        sdkLoaded: false,   // sdk is loaded
        sdkReady: false,    // sdk is ready
        apiLoaded: false,   // the api has loaded the playlist
    }

    /* BINDS */ 
    let spotifySdkPlayer;

    function handleOnToogle() {}

    function errorHandler(args) {}
    function stateHandler(state) {}

    /* resets variable and updates currentState */
    function startRound() {
        // TODO: randomly choose some music
        // for now, always the first music for testing
        currentInfo.state = "game";
        currentInfo.musicIndex = 0;
        currentInfo.musicInfo = gameInfo.musicPlaylist[currentInfo.musicIndex];
        currentInfo.playedMs = 0;

        // TODO: start sdk player
        $isPlaying = true;

        currentInfo = currentInfo;
    }

    /* updates scores and updates state to "end" or "ready" */
    function endRound(idx) {
        // update round
        currentInfo.round += 1;
        // update score
        if (idx != -1 && currentInfo.musicIndex === idx) {
            gameInfo.score += currentInfo.roundScore;
        }
        // goto
        currentInfo.state = currentInfo.round === gameInfo.maxRounds ? "end" : "ready";
    }

    $: {
        gameStatus.canStart = gameStatus.sdkLoaded && gameStatus.sdkReady && gameStatus.apiLoaded;
        gameStatus = gameStatus;
    }

    onMount(() => {
        // TODO: load token before gameplay
        const urlParams = new URLSearchParams(window.location.search);
        const access_token = urlParams.get("token");
        $spotifyAPIHandler.setAccessToken(access_token);

        // loading playlist via api
        $spotifyAPIHandler.getPlaylist(playlistId, {
            fields: "name,images,tracks.items.track(id,name,artists.name,duration_ms)"
        }, (err, val) => {
            console.log(val);
            if (err === null) {
                gameInfo.musicPlaylist = val.tracks.items.map(v => v.track);
                gameStatus.apiLoaded = true;
                gameInfo = gameInfo;
                gameStatus = gameStatus;
            } else {
                errorHandler({text: "Cannot load playlist"})
            }
        })
    })

</script>

<SpotifyLib
    bind:spotifyPlayer={spotifySdkPlayer}
    on:error={errorHandler}
    on:loaded="{() => {gameStatus.sdkLoaded = true; gameStatus = gameStatus}}"
    on:ready="{() => {gameStatus.sdkReady = true; gameStatus = gameStatus}}"
    on:notReady="{() => {gameStatus.sdkReady = false; gameStatus = gameStatus}}"
    on:state={stateHandler}
/>

{#if currentInfo.state === "start"}
    <StartScreen 
        enable={gameStatus.canStart}
        on:click={startRound}
    />


{:else if currentInfo.state === "game"}
    {#if isPlaying}
        <GameTick 
            bind:currentInfo={currentInfo}
            ms={DEFAULT_INTERVAL}
        />
    {/if}

    <PlayScreen
        gameInfo={gameInfo}
        bind:currentInfo={currentInfo}
        on:submit="{(e) => {endRound(e.detail.text)}}"
        on:giveup="{() => {endRound(-1)}}"
    />

{:else if currentInfo.state === "ready"}
    <ReadyScreen 
        currentRound={currentInfo.round}
        maxRounds={gameInfo.maxRounds}
        currentScore={currentInfo.roundScore}
        on:click={startRound}
    />

{:else if currentInfo.state === "end"}
    <!-- TODO: End screen -->

{:else }
    <!-- TODO: Error screen -->

{/if}


