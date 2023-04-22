<script>
    import VolumeSlider from "./VolumeSlider.svelte";
    import AudioPlayer from "./AudioPlayer.svelte";
    import SkipPlayPause from "./SkipPlayPause.svelte";
    
    export let maxMillis;
    export let currentMillis;
    export let contentName;

</script>

<div class="audio-interface">
    <SkipPlayPause on:toggle on:skip />
    <AudioPlayer {currentMillis} {maxMillis} {contentName} />
    <VolumeSlider/>
</div>


<style>
    .audio-interface {
        width: 60%;
        height: 7vh;

        display: grid;
        grid-template-columns: 10% 70% 20%;
        grid-template-rows: 1fr 1fr 1fr;
        grid-template-areas: 
            "playpause nowplaying volume"
            "playpause progress volume"
            "playpause poweredby volume";
        column-gap: 0.5vh;
    }



    

</style>