<script>
    import Scorebar from "./Scorebar.svelte";
    import { gameScore } from "../../lib/stores";
    import { onMount } from "svelte";
    import { tweened } from "svelte/motion";
    import { quadOut } from "svelte/easing";
    import { fade, fly } from "svelte/transition";

    export let rounds = 4;
    export let maxRounds = 5;

    let oldValue = 0;
    let currentValue = tweened(0, {
        duration: 1000,
        easing: quadOut
    });
    let dif = 0;
    let doShowNew = false;

    gameScore.subscribe(value => {
        dif = value - oldValue;
        oldValue = value;

        // imediatly show new text
        if (dif > 0)
            showUpdate();

        // wait 500 to update score
        setTimeout(() => {$currentValue = value; }, 500);

    });

    function showUpdate() {
        doShowNew = true;
        setTimeout(() => { doShowNew = false; }, 2000);
    }

    onMount(() => {
        currentValue.set(0);
        oldValue = 0;
    })

</script>

<div class="scoreboard">
    <div class="points">
        <spam class="points-number">{$currentValue.toFixed(0)}</spam>
        <spam class="points-text">points</spam>
        
        {#if doShowNew}
            <spam class="points-new" in:fly={{x: -100, duration: 500}} out:fade>
                +{dif.toFixed(0)}
            </spam>
        {/if}
    </div>

    <Scorebar rounds={rounds} maxRounds={maxRounds} />
    
    <spam class="rounds">{rounds} / {maxRounds} rounds</spam>
    
</div>


<style>
    .scoreboard {
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
        width: 30%;
        position: relative;
    }

    .points {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: flex-end;
        color: #0BBA48;
        font-weight: bold;
    }

    .points-number {
        font-size: 4.5vmin;
    }

    .points-text {
        font-size: 1.5vmin;
        margin-bottom: 0.5vmin;
    }

    .points-new {
        font-size: 3.0vmin;
        color: rgba(11, 186, 72, 1);
        position: absolute;
        top: 10%;
        right: 0%;
        text-align: right;
    }

    .rounds {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: flex-start;
        color: #787878;
        font-weight: 100;
    }

</style>