<script>
    import { spotifyAPIHandler, isPlaying } from "../../lib/stores";
    import { onDestroy, onMount } from 'svelte';
    import GameTick from "../../lib/GameTick.svelte";
    import AudioInterface from "./audio/AudioInterface.svelte";
    import SearchBar from "./search/SearchBar.svelte";
    import Results from "./list/Results.svelte";
    import SpotifyLib from "../../lib/SpotifyLib.svelte";
    import ReadyScreen from "./ReadyScreen.svelte";
    import StartScreen from "./StartScreen.svelte";

    const DEFAULT_INTERVAL = 100;   // ms to update track size

    let totalScore = 0;             // total score of all rounds combined
    let currentState = "start";     // possible states: [start, game, ready, end, error]
    let currentRound = 0;           // current round of the game
    let currentMusicIndex = -1;     // index of the current playing music
    let currentScore = -1;          // score of the current round
    let currentPlayedMs = -1;       // total milliseconds of music played
    let currentTrackDuration = -1;  //

    let isSdkLoaded = false;        // sdk is loaded
    let isSdkReady = false;         // sdk is ready
    let isSubmitted = false;        // player has submitted some music
    let isGiveUp = false;           // player gave up guessing the music
    
    let enableStart = false;        // the player may start the game
    
    let playerTrackInterval = undefined;

    export let maxRounds = 5;       // number of rounds to be played 
    export let allMusic = [ 
        {
            "id": 1234,
            "name": "Red",
            "artist": "Artista 1",
            "duration_ms": 10000
        },
        {
            "id": 2345,
            "name": "Blue",
            "artist": "Artista 2", 
            "duration_ms": 20000
        },
        {
            "id": 3456,
            "name": "Red Green",
            "artist": "Artista 1",
            "duration_ms": 30000
        }
    ];

    /* ------------ GAME LOGIC ------------ */
    // current milliseconds of music played
    $: if (currentState == "game") {
        currentTrackDuration = allMusic[currentMusicIndex]['duration_ms'];
    }
    // currentScore update logic
    $: if (currentPlayedMs > 0 && currentTrackDuration > 0) {
        currentScore = 1000 * (1 - (currentPlayedMs/currentTrackDuration));
    }
    
    function updatePlayedMs() {
        if ($isPlaying) {
            currentPlayedMs += DEFAULT_INTERVAL;
        }
        if (currentPlayedMs >= currentTrackDuration) {
            currentPlayedMs = currentTrackDuration;     // fixes current score to 0
            // TODO: stop player
            $isPlaying = false;
        }
    }

    function handleTooglePlay() {
        // TODO: toogle pause on player
        $isPlaying = !$isPlaying
    }

    // resets variable and updates currentState
    function startRound() {
        // TODO: randomly choose some music
        // for now, always the first music for testing
        currentMusicIndex = 0;

        isSubmitted = false;
        isGiveUp = false;
        currentPlayedMs = 0;
        searchedText = "";

        // TODO: start spotify player
        $isPlaying = true;

        currentState = "game";
    }

    // updates scores and updates currentState to "end" or "ready"  
    function endRound() {
        currentRound += 1;
        if (isSubmitted && currentMusicIndex === indexSelected) {
            totalScore += currentScore;
        }

        if (currentRound === maxRounds) {
            currentState = "end";
        } else {
            currentState = "ready";
        }
    }

    /* ------------ END GAME LOGIC ----------- */ 

    let indexSelected;
    let searchedText;
    $: enableSubmit = indexSelected != -1;
    $: enableStart = isSdkLoaded && isSdkReady && currentState === "start";

    function errorHandler(args) {
        // TODO: parse errors
        console.log("Error from PlayScreen: ", args.text);
    }

    function stateHandler(state) {

    }

    onMount(() => {
        // TODO: add something
    });

    onDestroy(() => {
        if (playerTrackInterval !== undefined) {
            clearInterval(playerTrackInterval)
        }
    })
</script>

<SpotifyLib 
    on:error={errorHandler}
    on:loaded="{() => {isSdkLoaded = true}}"
    on:ready="{() => {isSdkReady = true}}"
    on:notReady="{() => {isSdkReady = false}}"
    on:state={stateHandler}
/>

{#if currentState === "start"}
    <StartScreen 
        enable={enableStart}
        on:click={startRound}
    />

{:else if currentState === "game"}
    {#if isPlaying}
        <GameTick 
            callback={updatePlayedMs}
            ms={DEFAULT_INTERVAL}
        />
    {/if}

    <div class="play-screen">
        <AudioInterface 
            currentMillis={currentPlayedMs}
            maxMillis={currentTrackDuration}
            playing={$isPlaying}
            on:click={handleTooglePlay}
        />

        <SearchBar 
            bind:searchedText
            enableSubmit={enableSubmit}
            on:click={() => {isSubmitted = true; endRound()}}
        />

        <spam>Current music: ({indexSelected})</spam>
        <spam>Current isPlaying: {$isPlaying}</spam>

        <Results 
            fullContent={allMusic} 
            searchedText={searchedText} 
            bind:indexSelected
            on:submit={() => {isSubmitted = true; endRound()}}
            on:giveUp={() => {isGiveUp = true; endRound()}}
        />
    </div>
{:else if currentState === "ready"}
    <ReadyScreen 
        currentRound={currentRound}
        maxRounds={maxRounds}
        currentScore={currentScore}
        on:click={startRound}
    />

{:else if currentState === "end"}
    <!-- TODO: End screen -->

{:else }
    <!-- TODO: Error screen -->

{/if}

<style>
    .play-screen {
        display: flex;
        flex-flow: column nowrap;
        gap: 20px;
        align-items: center;
        padding-left: 100px;
        padding-right: 100px;
        padding-top: 200px;
    }
</style>