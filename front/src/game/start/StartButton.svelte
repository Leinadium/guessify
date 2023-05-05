<script>
    import { fade } from "svelte/transition";
    import { tweened } from "svelte/motion";
    import { cubicInOut, cubicOut } from "svelte/easing";
    import { onMount, createEventDispatcher } from "svelte";
    import Text from "../../common/Text.svelte";

    let dispatch = createEventDispatcher();

    export let loading = {
        text: "",
        progress: 0,
        done: false
    };

    const loadingProgress = tweened(0, {
        duration: 500,
        easing: cubicOut
    });

    const readySize = tweened(0.25, {
        duration: 750,
        easing: cubicInOut
    })

    let showStartText = false;
    let disableButton = false;

    // update loading progress
    $: loadingProgress.set(loading.progress);

    $: if (loading.done) { 
        readySize.set(1);
        setTimeout(() => {showStartText = true;}, 600); 
    }

    function handleClick() {
        if (loading.done) {
            dispatch("start");
            disableButton = true;
        }
    }

    onMount(() => {
        disableButton = false;
        loadingProgress.set(loading.progress);
    })

</script>


<div class="wrapper-btn">
    <!-- button when loading or ready -->
    {#if !disableButton}
        <button class="btn-start" on:click={handleClick} disabled={!loading.done}>
            {#if !loading.done}
                <div class="loading-wrapper">
                    <div class="loading-progress" style="width: {$loadingProgress * 100}%" in:fade></div>
                </div>

            {:else}
                <div class="ready" style="height: calc({$readySize} * var(--max-height))">
                    {#if showStartText}<div class="text" in:fade><Text key="start-start" /></div>{/if}
                </div>
            {/if}
        </button>
        {#if !loading.done}
        <div class="loading-texts">
            <span class="loading-text">{loading.text}</span>    
            <span class="loading-text">{Math.floor(loading.progress * 100)}%</span>
        </div>
        {/if}

    {:else}
        <!-- display after button is cliked-->
        <img src="/assets/spin.svg" alt="Starting" class="after-start" in:fade="{{duration: 100}}">
    {/if}

    
</div>



<style>
    .wrapper-btn {
        color: #787878;
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
    }

    .btn-start:disabled {
        cursor: default;
    }

    .btn-start {
        width: 20vh;
        height: fit-content;
        border: 0;
        background: transparent;
        position: relative;

        display: flex;
        flex-flow: column nowrap;
        align-items: flex-start;
        padding: 0;
        cursor: pointer;
    }

    .loading-wrapper {
        width: 100%;
        height: 100%;
        border-radius: 2vh;
        background: #fff;
    }

    .loading-progress {
        height: 1.8vh;
        background: #5A5A5A;
        border-radius: 2vh;
        border: 0;
    }

    .loading-texts {
        margin-top: 0.3vh;
        height: 1vh;
        font-size: 2vh;
        font-weight: 800;

        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
        gap: 0.2vh;
    }

    .ready {
        width: 100%;
        --max-height: 8vh;
        background: #3034BA;
        border-radius: 2vh;

        display: flex;
        justify-content: center;
        align-items: center;

        color: #fff;
        font-weight: bold;
        font-size: 3vh;
    }

    .after-start {
        width: 8vh;
        height: 8vh;
    }
</style>