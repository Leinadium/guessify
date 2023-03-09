<script>
    import AudioPlayer from "./AudioPlayer.svelte";
</script>

<div class="audio-interface">
    <!-- player de audio -->
    <AudioPlayer />

    <!-- botao de pause -->
    <button id="pause-button">
        pause
    </button>
    <!-- botao de tocar do inicio -->
    <button id="replay-button">
        replay
    </button>
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
        flex: 1 1 auto;
        color: blue;
    }    
</style>