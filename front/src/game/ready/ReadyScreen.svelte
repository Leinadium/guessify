<script>
    import { createEventDispatcher } from "svelte";
    import { fade } from "svelte/transition";
    import ReadyButton from "./ReadyButton.svelte";
    import MusicInfo from "./MusicInfo.svelte";

    export let gameInfo;
    export let currentInfo;
    export let endInfo;

    let dispatch = createEventDispatcher();

    let show = true;
    function returnToGame() {
        show = false;
        dispatch("click", {});
    }

</script>

{#if show}
    <div class="ready-screen" transition:fade="{{duration: 500}}">
        <div class="main-text">
            {#if endInfo.success}
                <img class="text-icon" src="/assets/correct.svg" alt="Correct">
                <div class="texts correct">
                    <spam class="title">Correct</spam>
                    <spam class="description">You got {currentInfo.roundScore.toFixed(0)} points!</spam>
                </div>
                
            {:else}
                <img class="text-icon" src="/assets/wrong.svg" alt="Incorrect">
                <div class="texts wrong">
                    <spam class="title">Wrong</spam>
                    <spam class="description">Try again!</spam>
                </div>
                
            {/if}          
        </div>

        <MusicInfo 
            info={currentInfo.musicInfo}
            success={endInfo.success}
        />

        <ReadyButton 
            on:click={returnToGame}
            roundsToGo={gameInfo.maxRounds - currentInfo.round}
        />

    </div>
{/if}

<style>
    .ready-screen {
        margin-top: 5vh;
        width: 100%;

        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;

        gap: 2vh;
    }

    .main-text {
        height: 10vh;
        width: 60vw;
        
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;

        gap: 1vw;
    }

    .text-icon {
        height: 70%;
        aspect-ratio: 1 / 1;
    }

    .title {
        font-size: 4.5vh;
        font-weight: 600;    
    }

    .correct {
        color: #1db954;
    }

    .wrong {
        color: #BA110B;
    }

    .texts {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: flex-start;
    }

    .description {
        font-size: 2vh;
        font-weight: 200;
    }
</style>
