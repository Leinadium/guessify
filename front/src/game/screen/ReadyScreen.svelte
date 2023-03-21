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
    <spam>Success: {endInfo.success}</spam>

    {#if showCorrectMusic }
        <spam>Correct track: {endInfo.correctTrack.name}</spam>
    {/if}

    <spam>Current round: {currentInfo.round}/{gameInfo.maxRounds}</spam>

    <spam>Score earned: {endInfo.scoreEarned}</spam>

    <spam>Total score: {gameInfo.score}</spam>
</div>

<button on:click={returnToGame}>Ready</button>

<style>
    div {
        display: flex;
        flex-flow: column nowrap;
        gap: 10px;
    }
</style>
