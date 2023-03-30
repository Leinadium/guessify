<script>
    import SpotifyLib from "../lib/SpotifyLib.svelte";
    import PlayScreen from "./screen/PlayScreen.svelte";
    import ReadyScreen from "./screen/ReadyScreen.svelte";
    import StartScreen from "./screen/StartScreen.svelte";
    import { spotifyAPIHandler, isPlaying } from "../lib/stores"
    import GameTick from "../lib/GameTick.svelte";
    import { getFullPlaylistInfo, removeDuplicates } from "../lib/utils";

    const DEFAULT_INTERVAL = 100;   // ms to update track size

    export let gameInfo = {
        score: 0,           // total score of all rounds combined
        maxRounds: 5,       // number of rounds to be played
        musicPlaylist: [],  // playlist
        playlistUri: ""
    }

    export let playlistId = "";   

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
        correctTrack: {}
    }

    /* BINDS */ 
    let spotifySdkPlayer;
    let spotifyDeviceId;

    function handleOnToggle() {
        spotifySdkPlayer.togglePlay();
    }

    function errorHandler(args) {
        // :(
        console.log("error: ", args);
    }
    function stateHandler(state) {
        // https://developer.spotify.com/documentation/web-playback-sdk/reference/#object-web-playback-state
        $isPlaying = !state.paused;
    }

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
        if (idx !== -1 && currentInfo.musicIndex === idx) {
            gameInfo.score += currentInfo.roundScore;
            endInfo.scoreEarned = currentInfo.roundScore;
            endInfo.success = true;
        } else {
            endInfo.scoreEarned = 0;
            endInfo.success = false;
            endInfo.correctTrack = currentInfo.musicInfo;
        }
        // goto
        currentInfo.state = currentInfo.round === gameInfo.maxRounds ? "end" : "ready";
    }

    function setPlayback() {
        // getFullPlayListInfo --> calls getPlaylist and getPlaylistTracks
        getFullPlaylistInfo($spotifyAPIHandler, playlistId).then((val) => {
            // setting up variables
            gameInfo.playlistUri = val.uri;
            gameInfo.musicPlaylist = removeDuplicates(val.tracks.map(v => v.track));
            gameStatus.apiLoaded = true; 
        }).then(() => {
            // to avoid some 502 bad gateways during transfer,
            // https://github.com/spotify/web-api/issues/700#issuecomment-340192774
            // attempting to play something before transfer
            $spotifyAPIHandler.play().catch(() => {
                console.log("Attempting to play before transfer failed. That's ok");
            })
        }).then(() =>
            // transfering playback to new device id 
            $spotifyAPIHandler.transferMyPlayback([spotifyDeviceId]).catch(() => {
                console.log("Failed to transfer. Plan B");
                // if 502 still happens, try to play some music in the new device directly
                console.log("Plan B (1): Muting sdk player");
                spotifySdkPlayer.setVolume(0).then(() => {
                    console.log("Plan B (2): using /play directly");
                    return $spotifyAPIHandler.play({
                        device_id: spotifyDeviceId,
                        context_uri: gameInfo.playlistUri
                    }).then(() => {
                        console.log("Plan B (3): pausing playback");
                        return spotifySdkPlayer.pause();
                    }).then(() => {
                        console.log("Plan B (4): restoring volume");
                        return spotifySdkPlayer.setVolume(0.7);
                    })
                })
            })
        ).then(() =>
            // pause the playback on the browser
            $spotifyAPIHandler.pause({device_id: spotifyDeviceId}).catch(() => {
                console.log("Attempting to pause after transfer failed. That's ok");
            })
        ).then(() => {
            // sdk is ready at least!
            gameStatus.sdkConfigured = true;
        }).catch(errorHandler);
    }

    $: gameStatus.canStart = (
        gameStatus.sdkLoaded && 
        gameStatus.sdkReady && 
        gameStatus.apiLoaded && 
        gameStatus.sdkConfigured
    );

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
        on:pauseplay={handleOnToggle}
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
    <span>End score: {gameInfo.score}</span>

{:else }
    <!-- TODO: Error screen -->

{/if}


