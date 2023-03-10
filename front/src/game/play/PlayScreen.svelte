<script>
    import { musicSubmitted } from "../../lib/stores";
    import { onDestroy, onMount } from 'svelte';
    import AudioInterface from "./audio/AudioInterface.svelte";
    import SearchBar from "./SearchBar.svelte";
    import Results from "./Results.svelte";
    import SpotifyLib from "../../lib/SpotifyLib.svelte";

    let isLoaded = false;

    let allMusic = [
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

    let indexSelected;
    let searchedText;
    $: enableSubmit = indexSelected != -1;

    const unsubSubmitted = musicSubmitted.subscribe(value => {
        if (value != -1) {
            console.log("Musica submetida: ", value);
        }
    })

    function replayMusic() {
        // TODO
    }

    onMount(() => {
        musicSubmitted.set(-1);
    })
    
    onDestroy(unsubSubmitted);
</script>

<!-- <SpotifyLib on:loaded="{() => {isLoaded = true}}" />   -->

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
    />
</div>


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