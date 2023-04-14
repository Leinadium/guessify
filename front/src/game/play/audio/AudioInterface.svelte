<script>
    import VolumeSlider from "./VolumeSlider.svelte";
    import AudioPlayer from "./AudioPlayer.svelte";
    import SkipPlayPause from "./SkipPlayPause.svelte";
    
    export let maxMillis;
    export let currentMillis;

</script>

<div class="audio-interface">
    <SkipPlayPause on:toggle on:skip />
    <AudioPlayer {currentMillis} {maxMillis} />
    <VolumeSlider/>
</div>


<style>
    .audio-interface {
        width: 60%;
        height: 7vmin;

        display: grid;
        grid-template-columns: 20% auto 20%;
        grid-template-rows: 2fr 1fr 2fr;
        grid-template-areas: 
            "playpause nowplaying volume"
            "playpause progress volume"
            "playpause poweredby volume";
        column-gap: 0.5vmin;
    }



    

</style>