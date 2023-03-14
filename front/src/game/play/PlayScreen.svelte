<script>
    import { spotifyAPIHandler } from "../../lib/stores";
    import { onDestroy, onMount } from 'svelte';
    import AudioInterface from "./audio/AudioInterface.svelte";
    import SearchBar from "./search/SearchBar.svelte";
    import Results from "./list/Results.svelte";
    import SpotifyLib from "../../lib/SpotifyLib.svelte";
    import ReadyScreen from "./ReadyScreen.svelte";
    import StartScreen from "./StartScreen.svelte";

    let currentState = "start";     // [start, game, ready, end, error]
    let isLoaded = false;
    let isReady = false;
    let isSubmitted = false;
    let enableStart = false;
 
    export let allMusic = [
        {
            "id": 1234,
            "name": "Red",
            "artist": "Artista 1"
        },
        {
            "id": 2345,
            "name": "Blue",
            "artist": "Artista 2"
        },
        {
            "id": 3456,
            "name": "Red Green",
            "artist": "Artista 1"
        }
    ];

    /* ---- GAME LOGIC ---- */
    
    // update enableStart game
    $: enableStart = isLoaded && isReady && currentState === "start";



    /* ---- END GAME LOGIC --- */ 

    let indexSelected;
    let searchedText;
    $: enableSubmit = indexSelected != -1;

    function replayMusic() {
        $spotifyAPIHandler.seek(0, (error, _) => {
            if (error != null) {
                errorHandler({text: error})
            }
        })
        // TODO
    }

    function errorHandler(args) {
        // TODO: parse errors
        console.log("Error from PlayScreen: ", args.text);
    }

    function stateHandler(state) {

    }

    onMount(() => {
        // TODO: add something
    });
</script>

<SpotifyLib 
    on:error={errorHandler}
    on:loaded="{() => {isLoaded = true}}"
    on:ready="{() => {isReady = true}}"
    on:notReady="{() => {isReady = false}}"
    on:state={stateHandler}
/>

{#if currentState === "start"}
    <StartScreen 
        enable={enableStart}
        on:click={() => currentState = "game"}
    />

{:else if currentState === "game"}
    <div class="play-screen">
        <AudioInterface on:click={replayMusic}/>

        <SearchBar 
            bind:searchedText
            enableSubmit={enableSubmit}
        />

        <spam>Current music: ({indexSelected})</spam>

        <Results 
            fullContent={allMusic} 
            searchedText={searchedText} 
            bind:indexSelected
            on:submit={() => {isSubmitted = true;}}
        />
    </div>
{:else if currentState === "ready"}
    <ReadyScreen />

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