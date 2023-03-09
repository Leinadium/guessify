<script>
    // the audio time style was based on this code from "Ychnightder-both"
    // https://codepen.io/bold02/pen/XWKMXNe

    export let currentPerc = 0.2;
    export let maxTimeSecs = 0;

    // https://stackoverflow.com/questions/1322732/convert-seconds-to-hh-mm-ss-with-javascript
    $: currentTimeStr = new Date(maxTimeSecs * currentPerc * 1000).toISOString().substring(14, 19)
</script>


<div class="audio-player">
    
    <spam>{currentTimeStr}</spam>

    <div class="progress-player">
        <div class="progress-bar" style="width: {currentPerc * 100}%;"></div>
    </div>

    <input type=range class="volume">


</div>


<style>
    .audio-player spam {
        color: #333333;
    }

    .audio-player {
        flex: 5 0 60%;
        
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 4px;
        background-color: aqua;
        height: 30px;
    }

    .progress-player {
        box-sizing: border-box;
        height: 100%;
        width: 100%;
        border: 8px solid black;
        border-radius: 15px;
    }

    .progress-bar {
        position: relative;
        background-color: red;
        width: 5%;
        height: 100%;
        border-radius: 15px;

    }
    

</style>