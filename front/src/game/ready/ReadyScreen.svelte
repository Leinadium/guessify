<script>
    import { createEventDispatcher, onDestroy, onMount } from "svelte";
    import { fade } from "svelte/transition";
    import ReadyButton from "./ReadyButton.svelte";
    import MusicInfo from "./MusicInfo.svelte";

    export let gameInfo;
    export let currentInfo;
    export let endInfo;

    let dispatch = createEventDispatcher();

    let show = true;
    let canShowLoading = false;
    let loadingHandle;

    function returnToGame() {
        show = false;
        // hide the screen, and then call to game
    }

    function afterHide() {
        dispatch("click", {});
        
        loadingHandle = setInterval(() => {
            canShowLoading = true;
        }, 1500);
    }

    onMount(() => {
        show = true;
        canShowLoading = false;
    })

    onDestroy(() => {
        canShowLoading = false;
        clearInterval(loadingHandle);
    });

</script>

{#if show}
    <div class="ready-screen" transition:fade="{{duration: 500}}" on:outroend={afterHide}>
        <div class="main-text">
            {#if endInfo.success}
                <img class="text-icon" src="/assets/correct.svg" alt="Correct">
                <div class="texts correct">
                    <span class="title">Correct</span>
                    <span class="description">You got {currentInfo.roundScore.toFixed(0)} points!</span>
                </div>
                
            {:else}
                <img class="text-icon" src="/assets/wrong.svg" alt="Incorrect">
                <div class="texts wrong">
                    <span class="title">Wrong</span>
                    <span class="description">Try again!</span>
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
{:else if canShowLoading}
    <span class="loading-icon">
        <img src="/assets/spin.svg" alt="">
    </span>
{/if}

<style>
    .loading-icon {
        margin-top: 10vh;
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;

        font-size: 5vh;
        font-weight: 600;
        color: #777;
    }
    .loading-icon > img {
        height: 8vh;
        aspect-ratio: 1 / 1;
    }

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
