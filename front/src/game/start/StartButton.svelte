<script>
    import { fade } from "svelte/transition";
    import { tweened } from "svelte/motion";
    import { cubicInOut, cubicOut } from "svelte/easing";
    import { onMount, createEventDispatcher } from "svelte";

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

    const readySize = tweened(0.125, {
        duration: 1000,
        easing: cubicInOut
    })

    let showStartText = false;

    // update loading progress
    $: loadingProgress.set(loading.progress);

    $: if (loading.done) { 
        readySize.set(1);
        setTimeout(() => {showStartText = true;}, 1000); 
    }

    function handleClick() {
        if (loading.done)
            dispatch("start");
    }

    onMount(() => {
        loadingProgress.set(loading.progress);
    })

</script>


<div class="wrapper-btn">
    <button class="btn-start" on:click={handleClick}>
        {#if !loading.done}
            <div class="loading-wrapper">
                <div class="loading-progress" style="width: {$loadingProgress * 100}%" in:fade></div>
            </div>

        {:else}
            <div class="ready" style="height: calc({$readySize} * var(--max-height))">
                {#if showStartText}<div class="text" in:fade>Start</div>{/if}
            </div>
        {/if}
    </button>
    {#if !loading.done}
        <div class="loading-texts">
            <spam class="loading-text">{loading.text}</spam>    
            <spam class="loading-text">{Math.floor(loading.progress * 100)}%</spam>
        </div>
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

    .btn-start {
        width: 20vmin;
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
        border-radius: 2vmin;
        background: #fff;
    }

    .loading-progress {
        height: 1vmin;
        background: #5A5A5A;
        border-radius: 2vmin;
        border: 0;
    }

    .loading-texts {
        margin-top: 0.3vmin;
        height: 1vmin;
        font-size: 1.5vmin;
        font-weight: 800;

        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
        gap: 0.2vmin;
    }

    .ready {
        width: 100%;
        --max-height: 8vmin;
        background: #3034BA;
        border-radius: 2vmin;

        display: flex;
        justify-content: center;
        align-items: center;

        color: #fff;
        font-weight: bold;
        font-size: 3vmin;
    }
</style>