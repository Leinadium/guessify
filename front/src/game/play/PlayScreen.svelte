<script>
    import { isPlaying } from '../../lib/stores';
    import { createEventDispatcher, onMount } from 'svelte';
    import AudioInterface from "./audio/AudioInterface.svelte";
    import SearchBar from "./search/SearchBar.svelte";
    import Results from "./list/Results.svelte";

    let dispatch = createEventDispatcher();

    export let currentInfo;
    export let gameInfo;

    // currentScore update logic
    $: if (currentInfo.playedMs > 0 && currentInfo.musicInfo['duration_ms'] > 0) {
        currentInfo.roundScore = 1000 * (1 - (currentInfo.playedMs / currentInfo.musicInfo['duration_ms']));
    }

    let searchedText = "";
    let selectedIndex = -1;
    $: enableSubmit = selectedIndex != -1;

    // whenever a new game starts, resets the internal info
    onMount(() => {
        searchedText = "";
        selectedIndex = -1;
    })

    $: submission = () => {dispatch("submit", {text: searchedText, index: selectedIndex})};
    const givingUp = () => {dispatch("giveup", {})};

</script>

<div class="play-screen">
    <AudioInterface 
        currentMillis={currentInfo.playedMs}
        maxMillis={currentInfo.musicInfo['duration_ms']}
        playing={$isPlaying}
        on:pauseplay
    />

    <SearchBar 
        bind:searchedText
        enableSubmit={enableSubmit}
        on:click={submission}
    />

    <Results 
        fullContent={gameInfo.content.tracks} 
        searchedText={searchedText} 
        bind:selectedIndex
        on:submit={submission}
        on:giveUp={givingUp}
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
        padding-top: 50px;
    }
</style>