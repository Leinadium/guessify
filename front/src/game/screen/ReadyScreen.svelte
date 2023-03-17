<script>
    export let endInfo;
    export let currentRound = 0;
    export let maxRounds = 0;
    export let totalScore = 0;
</script>

<div>
    <spam>Success: {endInfo.success}</spam>

    <spam>Current round: {currentRound}/{maxRounds}</spam>

    <spam>Score earned: {endInfo.scoreEarned}</spam>

    <spam>Total score: {totalScore}</spam>
</div>

<button on:click>Ready</button>

<style>
    div {
        display: flex;
        gap: 10px;
    }
</style>
