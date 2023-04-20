<script>
    import SpotifyLib from "../lib/SpotifyLib.svelte";
    import PlayScreen from "./play/PlayScreen.svelte";
    import ReadyScreen from "./ready/ReadyScreen.svelte";
    import StartScreen from "./start/StartScreen.svelte";
    import { spotifyAPIHandler, isPlaying, gameScore, volume } from "../lib/stores"
    import GameTick from "./play/GameTick.svelte";
    import Scoreboard from "./scoreboard/Scoreboard.svelte";
    import { onMount } from "svelte";

    const DEFAULT_INTERVAL = 100;   // ms to update track size

    export let gameInfo = {
        maxRounds: 5,       // number of rounds to be played
        content: {},        // playlist/album object
        played: []          // array of indexes of played tracks  
    }

    let currentInfo = {
        state: "start",     // possible states: [start, game, ready, end, error]
        round: 0,           // current round of the game
        musicIndex: -1,     // index of the current playing music
        musicInfo: {},      // info of the current playing music
        roundScore: -1,     // score of the current round
        playedMs: -1,       // total milliseconds of music played
    } 

    let loadingStatus = {
        done: false,
        text: "",
        progress: 0,
    }

    let endInfo = {
        success: false,
        scoreEarned: 0,
        correctTrack: {}
    }

    let playerStateInfo = {
        hasToPause: false,          // whenever the player may not play music
        // isTryingToPause: false,
        hasToStart: false,          // whenever the player has to play some music (attempt 3)
        isTryingToStart: false,
    }

    /* BINDS */ 
    let spotifySdkPlayer;
    let spotifyDeviceId;

    function handleOnToggle() {
        spotifySdkPlayer.togglePlay();
    }

    function errorHandler(args) {
        // TODO: error screen
        console.log("error: ", args);
    }
    function stateHandler(event) {
        const state = event.detail;
        console.log(state);

        // update isPlaying
        $isPlaying = !state.paused;

        // update pause status accordingly
        if (!state.paused && playerStateInfo.hasToPause) {
            spotifySdkPlayer.pause().then(() => console.log("Done pausing SDK")).catch(errorHandler);
            console.log("Forcing pause");
        }

        // updating playedMs
        currentInfo.playedMs = state.position;

        // update end of track
        if (currentInfo.state === "game" && state.position === 0) {
            if (state.track_window.previous_tracks.length > 0) {
                console.log(state.track_window.previous_tracks[0].uri);
                console.log(currentInfo.musicInfo.uri);
                if (state.track_window.previous_tracks[0].uri === currentInfo.musicInfo.uri)
                    endRound(-1);
            }
        }

    }

    /* resets variable and updates currentState */
    function startRound() {
        // getting random music
        let possibleIndexes = [];
        for (let i = 0; i < gameInfo.content.tracks.length; i++) {
            if (!gameInfo.played.includes(i)) {
                possibleIndexes.push(i);
            }
        }
        console.log("Possible tracks: ", possibleIndexes.length);
        const newIdx = possibleIndexes[Math.floor(Math.random() * possibleIndexes.length)];
        currentInfo.musicIndex = newIdx;
        currentInfo.musicInfo = gameInfo.content.tracks[newIdx];
        currentInfo.playedMs = 0;

        // playing music
        playerStateInfo.hasToPause = false;
        $spotifyAPIHandler.play({
            device_id: spotifyDeviceId,
            uris: [currentInfo.musicInfo.uri]
        }).then(() => {
            currentInfo.state = "game";
        }).catch(errorHandler);

        
    }

    /* updates scores and updates state to "end" or "ready" */
    function endRound(idx) {
        // pausing the player via sdk
        spotifySdkPlayer.pause();
        // update round
        currentInfo.round += 1;
        gameInfo.played.push(currentInfo.musicIndex);
        // update score
        if (idx !== -1 && currentInfo.musicIndex === idx) {
            $gameScore += currentInfo.roundScore;
            endInfo.scoreEarned = currentInfo.roundScore;       // TODO: remove
            endInfo.success = true;
        } else {
            endInfo.scoreEarned = 0;
            endInfo.success = false;
            endInfo.correctTrack = currentInfo.musicInfo;
        }
        // goto
        currentInfo.state = currentInfo.round === gameInfo.maxRounds ? "end" : "ready";
    }

    async function setPlayback() {
        loadingStatus.text = "Preparing playback ... (1st attempt)";
        loadingStatus.progress = 0.7;
        try {
            // trying to avoid 502 during transfer
            try {
                await $spotifyAPIHandler.play();
            } catch {
                console.log("Attempting to play before transfer failed. That's ok");
            }

            // transfering playback to new device id
            try {
                await $spotifyAPIHandler.transferMyPlayback([spotifyDeviceId]);
            } catch {
                // if 502 happens anyways, try to play some music in the new device directly
                loadingStatus.text = "Preparing playback ... (2nd attempt)";
                console.log("Plan B (1): Muting sdk player");
                await spotifySdkPlayer.setVolume(0);
                console.log("Plan B (2): using /play directly");
                await $spotifyAPIHandler.play({
                    device_id: spotifyDeviceId,
                    context_uri: gameInfo.content.uri
                });
                console.log("Plan B (3): pausing playback");
                await spotifySdkPlayer.pause();
                console.log("Plan B (4): restoring volume");
                await spotifySdkPlayer.setVolume(0.6);
            }
            
            // pause the playback on the browser
            try {
                await spotifySdkPlayer.pause();
                // this method may fail silently because the sdk is still transfering the playback
                // so, to be sure, use .hasToPause
                playerStateInfo.hasToPause = true;
            } catch {
                console.log("Attempting to pause after transfer failed. That's ok");
            }
            
            // binding volume to sdk player
            volume.subscribe((v) => spotifySdkPlayer.setVolume(v));

            console.log("finished");
            loadingStatus.text = "Done!";
            loadingStatus.progress = 1;
            loadingStatus.done = true;
        } catch (error) {
            errorHandler(error);
        }
    }   

    onMount(() => {
        loadingStatus.text = "Connecting to Spotify SDK...";
        loadingStatus.progress = 0.2;
    })

    function onSdkLoaded() {
        loadingStatus.text = "Spotify SDK has loaded";
        loadingStatus.progress = 0.5;
    }

    function onSdkNotReady() {
        loadingStatus.text = "Spotify SDK disconnected";
        loadingStatus.progress = 0.5;
        loadingStatus.done = false;
    }

</script>

<SpotifyLib
    bind:spotifyPlayer={spotifySdkPlayer}
    bind:deviceId={spotifyDeviceId}
    on:error={errorHandler}
    on:loaded={onSdkLoaded}
    on:ready={setPlayback}
    on:notReady={onSdkNotReady}
    on:state={stateHandler}
/>

<div class="gameplay">
    <Scoreboard
        rounds={currentInfo.round}
        maxRounds={gameInfo.maxRounds}    
    />

    {#if currentInfo.state === "start"}
        <StartScreen 
            loading={loadingStatus}
            content={gameInfo.content}
            on:start={startRound}
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
            on:skip="{() => {endRound(-1)}}"
            on:toggle={handleOnToggle}
        />

    {:else if currentInfo.state === "ready"}
        <ReadyScreen
            gameInfo={gameInfo}
            currentInfo={currentInfo}
            endInfo={endInfo}
            on:click={startRound}
        />

    {:else if currentInfo.state === "end"}
        <!-- TODO: End screen -->
        <span>End score: {$gameScore}</span>

    {:else }
        <!-- TODO: Error screen -->

    {/if}
</div>

<style>
    .gameplay {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        padding-top: 5vh;
        width: 100vw;
    }
</style>

