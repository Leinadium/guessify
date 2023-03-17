<script>
    export let currentRound = 0;
    export let maxRounds = 0;
    export let currentScore = 0;
    export let totalScore = 0;
</script>

<div>
    <spam>Current round: {currentRound}/{maxRounds}</spam>

    <spam>Current score: {currentScore}</spam>

    <spam>Total score: {totalScore}</spam>
</div>



<button on:click>Ready</button>