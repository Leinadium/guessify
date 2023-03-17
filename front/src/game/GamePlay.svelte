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
        playlistUri: ""
    }

    export let playlistId = "37i9dQZF1F0sijgNaJdgit";   

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
        sdkLoaded: false,   // sdk is loaded (the js library is set)
        sdkReady: false,    // sdk is ready (the sdk returned ready)
        sdkConfigured: false,   // sdk is configured to play
        apiLoaded: false,   // the api has loaded the playlist
    }

    let endInfo = {
        success: false,
        scoreEarned: 0,
    }

    /* BINDS */ 
    let spotifySdkPlayer;
    let spotifyDeviceId;

    function handleOnToogle() {}

    function errorHandler(args) {
        console.log("error: ", args);
    }
    function stateHandler(state) {}

    /* resets variable and updates currentState */
    function startRound() {

        // getting random music
        const newIdx = Math.floor(Math.random() * gameInfo.musicPlaylist.length);
        currentInfo.musicIndex = newIdx;
        currentInfo.musicInfo = gameInfo.musicPlaylist[newIdx];
        currentInfo.playedMs = 0;

        // playing music
        $spotifyAPIHandler.play({
            device_id: spotifyDeviceId,
            uris: [currentInfo.musicInfo.uri]
        }).then(() => {
            currentInfo.state = "game";
            $isPlaying = true;
        })

        
    }

    /* updates scores and updates state to "end" or "ready" */
    function endRound(idx) {
        // pausing the player via sdk
        spotifySdkPlayer.pause().then(() => {
            $isPlaying = false;
        })

        // update round
        currentInfo.round += 1;
        // update score
        if (idx != -1 && currentInfo.musicIndex === idx) {
            gameInfo.score += currentInfo.roundScore;
            endInfo.scoreEarned = currentInfo.roundScore;
            endInfo.success = true;
        } else {
            endInfo.scoreEarned = 0;
            endInfo.success = false;
        }
        // goto
        currentInfo.state = currentInfo.round === gameInfo.maxRounds ? "end" : "ready";
    }

    function setPlayback() {
        // set to shuffle
        $spotifyAPIHandler.getPlaylist(playlistId, {
            fields: "uri,name,images,tracks.items.track(uri,id,name,artists.name,duration_ms)"
        }).then((val) => {
            // setting up variables
            console.log(val);
            gameInfo.playlistUri = val.uri;
            gameInfo.musicPlaylist = val.tracks.items.map(v => v.track);
            gameStatus.apiLoaded = true;
        
        // after a lot of 502 bad gateways errors, it seems there are more chances of success
        // if some music is playing before transfer 
        }).then(() => {
            $spotifyAPIHandler.play().catch(() => {
                console.log("Attempting to play before transfer failed");
            })
        }).then(() =>  // transfer the playback
            $spotifyAPIHandler.transferMyPlayback([spotifyDeviceId])
        ).then(() =>  // then pause the playback on the browser
            $spotifyAPIHandler.pause({device_id: spotifyDeviceId}).catch(() => {
                console.log("Attempting to pause after transfer failed");
            })
        ).then(() => {  // finished configurations
            gameStatus.sdkConfigured = true;
        }).catch(errorHandler);
    }

    $: gameStatus.canStart = (
        gameStatus.sdkLoaded && 
        gameStatus.sdkReady && 
        gameStatus.apiLoaded && 
        gameStatus.sdkConfigured
    );

    onMount(() => {
        // TODO: load token before gameplay
        const urlParams = new URLSearchParams(window.location.search);
        const access_token = urlParams.get("token");
        $spotifyAPIHandler.setAccessToken(access_token);
    })

</script>

<SpotifyLib
    bind:spotifyPlayer={spotifySdkPlayer}
    bind:deviceId={spotifyDeviceId}
    on:error={errorHandler}
    on:loaded="{() => {gameStatus.sdkLoaded = true;}}"
    on:ready="{() => {gameStatus.sdkReady = true; setPlayback()}}"
    on:notReady="{() => {gameStatus.sdkReady = false;}}"
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
        on:submit="{(e) => {endRound(e.detail.index)}}"
        on:giveup="{() => {endRound(-1)}}"
    />

{:else if currentInfo.state === "ready"}
    <ReadyScreen 
        currentRound={currentInfo.round}
        maxRounds={gameInfo.maxRounds}
        endInfo={endInfo}
        totalScore={gameInfo.score}
        on:click={startRound}
    />

{:else if currentInfo.state === "end"}
    <!-- TODO: End screen -->
    <spam>End score: {gameInfo.score}</spam>

{:else }
    <!-- TODO: Error screen -->

{/if}


