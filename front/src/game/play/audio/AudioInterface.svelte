<script>
    import AudioPlayer from "./AudioPlayer.svelte";
    
    export let playing = false;
    export let maxMillis;
    export let currentMillis;
    export let currentVolume = 0.7;
</script>

<div class="audio-interface">
    <!-- player de audio -->
    <AudioPlayer 
        {currentMillis}
        {maxMillis}
        {currentVolume}
    />

    <button on:click>{#if playing}Pause{:else}Play{/if}</button>
</div>


<style>
    .audio-interface {
        width: 80%;

        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: stretch;
        gap: 10px;
    }

    button {
        width: 20%;

    }
</style>