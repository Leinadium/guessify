<script>
    import { isPlaying } from "../../../lib/stores";
</script>

<button on:click>
    {#if $isPlaying}
        <img src="/assets/pause.svg" alt="Pause"/>
    {:else}
        <img src="/assets/play.svg" alt="Play"/>
    {/if}
</button>

<style>
    button {
        grid-area: playpause;
        justify-self: end;
        align-self: center;

        width: 3vh;
        height: 3vh;
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