<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import AudioInterface from "./audio/AudioInterface.svelte";
    import SearchBar from "./search/SearchBar.svelte";
    import Results from "./list/Results.svelte";
    import {MAX_SCORE} from "../../lib/utils";

    let dispatch = createEventDispatcher();

    export let currentInfo;
    export let gameInfo;

    const MAX_SCORE_PER_ROUND = MAX_SCORE / gameInfo.maxRounds;
    // currentScore update logic
    $: if (currentInfo.roundMs > 0 && currentInfo.musicInfo['duration_ms'] > 0) {
        currentInfo.roundScore = Math.ceil(MAX_SCORE_PER_ROUND * (1 - (currentInfo.roundMs / currentInfo.musicInfo['duration_ms'])));
        if (currentInfo.roundScore < 0) currentInfo.roundScore = 0;
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

<div class="play-screen" in:fade="{{duration: 200}}">
    <AudioInterface
        contentName={gameInfo.content.name}
        currentMillis={currentInfo.playedMs}
        maxMillis={currentInfo.musicInfo['duration_ms']}
        on:toggle on:skip
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
        gap: 2vh;
        width: 100%;
        height: 100%;
        justify-content: flex-start;
        align-items: center;
        padding-top: 2vh;
    }
</style>