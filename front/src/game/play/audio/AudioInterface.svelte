<script>
    import VolumeSlider from "./VolumeSlider.svelte";
    import AudioPlayer from "./AudioPlayer.svelte";
    import PlayPause from "./PlayPause.svelte";
    import { createEventDispatcher } from "svelte";
    
    export let maxMillis;
    export let currentMillis;

    const dispatch = createEventDispatcher();

    function toggle() {
        dispatch("pauseplay", {})
    }

</script>

<div class="audio-interface">
    <PlayPause on:click={toggle} />
    <AudioPlayer {currentMillis} {maxMillis} />
    <VolumeSlider/>
</div>


<style>
    .audio-interface {
        width: 80%;
        height: 7vh;

        display: grid;
        grid-template-columns: auto 70% auto;
        grid-template-rows: 2fr 1fr 2fr;
        grid-template-areas: 
            "playpause nowplaying volume"
            "playpause progress volume"
            "playpause poweredby volume";
        column-gap: 1vh;
    }



    

</style>