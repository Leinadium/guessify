<script>
    import { isPlaying } from "../../../lib/stores";
    import { createEventDispatcher } from "svelte";

    let dispatch = createEventDispatcher();

    function toggle() { dispatch("toggle"); }
    function skip() { dispatch("skip"); }

</script>

<div class="buttons">
    <button on:click={skip}>
        <img src="/assets/skip.svg" alt="Skip" />
    </button>

    <button on:click={toggle}>
        {#if $isPlaying}
            <img src="/assets/pause.svg" alt="Pause"/>
        {:else}
            <img src="/assets/play.svg" alt="Play"/>
        {/if}
    </button>
</div>


<style>
    .buttons {
        grid-area: playpause;
        justify-self: end;
        align-self: center;

        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
        align-items: center;
        gap: 1.5vh;
        margin-right: 1.0vh;
    }

    button {  
        width: 4vh;
        height: 4vh;
        padding: 0;
        border: 0;
        background-color: transparent;
        cursor: pointer;
    }

    img {
        width: 100%;
        height: 100%;
    }
</style>