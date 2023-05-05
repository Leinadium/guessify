<script>
    import Text from "../../common/Text.svelte";
    import { createEventDispatcher, onMount } from "svelte";
    import { fade } from "svelte/transition";

    export let roundsToGo = 5;

    const isEnd = roundsToGo === 0;

    let dispatch = createEventDispatcher()

    let show = false;
    function handleKey(event) {
        if (event.key == "Enter" && show) {
            dispatch("click");
        }
    }
    onMount(() => {
        show = false;
        setTimeout(() => {
            show = true;
        }, 1000);
    });

</script>

<svelte:window on:keydown={handleKey}></svelte:window>

{#if show}
<button on:click in:fade="{{duration: 500}}">
    {#if !isEnd}
        <span class="big">
            <Text key="game-next"/>
        </span>

        <span class="small">
            <Text key="game-prenext" />
            {roundsToGo}
            <Text key="game-round"/>{roundsToGo > 1 ? "s" : ""}
            <Text key="game-posnext"/>
        </span>

    {:else}
        <span class="big"><Text key="game-endresults" /></span>
    {/if}
</button>
{/if}



<style>
    button {
        width: 30vh;
        height: 7.5vh;
        border: none;
        background: #3034BA;
        border-radius: 2vh;
        cursor: pointer;

        margin-top: 3vh;

        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-self: center;
    }

    .big {
        color: #eee;
        font-size: 3vh;
        font-weight: 800;
    }

    .small {
        color: #aaa;
        font-size: 1.8vh;
        font-weight: 500;
    }
</style>