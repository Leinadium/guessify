<script>
    export let playing = false;
</script>

<button on:click>
    {#if playing}
        <img src="/assets/pause.svg" alt="Pause"/>
    {:else}
        <img src="/assets/play.svg" alt="Play"/>
    {/if}
</button>

<style>
    button {
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