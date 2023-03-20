<script>
    export let currentInfo;
    export let gameInfo;
    export let endInfo;
</script>

<div>
    <spam>Success: {endInfo.success}</spam>

    {#if !endInfo.success }
        <spam>Correct track: {currentInfo.musicInfo.name}</spam>
    {/if}

    <spam>Current round: {currentInfo.round}/{gameInfo.maxRounds}</spam>

    <spam>Score earned: {endInfo.scoreEarned}</spam>

    <spam>Total score: {gameInfo.score}</spam>
</div>

<button on:click>Ready</button>

<style>
    div {
        display: flex;
        flex-flow: column nowrap;
        gap: 10px;
    }
</style>
