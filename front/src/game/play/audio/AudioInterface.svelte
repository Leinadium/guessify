<script>
    import VolumeSlider from "./VolumeSlider.svelte";
    import AudioPlayer from "./AudioPlayer.svelte";
    import PlayPause from "./PlayPause.svelte";
    import { createEventDispatcher } from "svelte";
    
    export let playing = false;
    export let maxMillis;
    export let currentMillis;
    export let currentVolume = 0.7;

    const dispatch = createEventDispatcher();

    function toggle() {
        dispatch("pauseplay", {})
    }

</script>

<div class="audio-interface">
    <PlayPause playing={playing} on:click={toggle} />
    <AudioPlayer {currentMillis} {maxMillis} />
    <VolumeSlider value={currentVolume}/>
</div>


<style>
    .audio-interface {
        width: 80%;
        height: 7vh;

        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        gap: 0.5vw;
    }



    

</style>