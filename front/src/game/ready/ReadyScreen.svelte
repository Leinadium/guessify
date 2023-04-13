<script>
    import { onMount, createEventDispatcher } from "svelte";

    export let currentInfo;
    export let gameInfo;
    export let endInfo;

    let dispatch = createEventDispatcher();

    let showCorrectMusic = !endInfo.success;
    function returnToGame() {
        showCorrectMusic = false;
        dispatch("click", {});
    }

</script>

<div>
    <span>Success: {endInfo.success}</span>

    {#if showCorrectMusic }
        <span>Correct track: {endInfo.correctTrack.name}</span>
    {/if}

    <span>Current round: {currentInfo.round}/{gameInfo.maxRounds}</span>

    <span>Score earned: {endInfo.scoreEarned}</span>
</div>

<button on:click={returnToGame}>Ready</button>

<style>
    div {
        display: flex;
        flex-flow: column nowrap;
        gap: 10px;
    }
</style>
