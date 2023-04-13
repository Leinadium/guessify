<script>
    import PoweredBy from "../../../common/PoweredBy.svelte";
    
    // the audio time style was based on this code from "Ychnightder-both"
    // https://codepen.io/bold02/pen/XWKMXNe
    export let currentMillis = 0;
    export let maxMillis = 1000;
    export let contentName = "Daily Mix #1";

    // to protected agains -1, 0 or undefined. who knows?
    $: safeCurrent = currentMillis > 0 ? currentMillis : 0.0;
    $: safeMax = maxMillis > 0 ? maxMillis : 1000;

    // https://stackoverflow.com/questions/1322732/convert-seconds-to-hh-mm-ss-with-javascript
    $: currentTimeStr = new Date(safeCurrent).toISOString().substring(14, 19)
</script>


<div class="audio-player">
    
    <spam class="now-playing">Now playing from: <spam class="content-name">{contentName}</spam></spam>

    <div class="middle">
        <spam>{currentTimeStr}</spam>
        <div class="progress-player">
            <div class="progress-bar" style="width: {safeCurrent / safeMax * 100}%;"></div>
        </div>
    </div>

    <div class="powered-by">
        <PoweredBy externUrl="https://open.spotify.com/" text="Powered by"/>
    </div>

</div>


<style>

    .audio-player {
        width: 80%; 
        height: 100%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        color: #EEEEEE;
        font-size: 1.0vh;
    }

    spam {
        height: 1.2vh;
    }

    .now-playing {
        color: #A0A0A0;
        font-size: 1.2vh;
        padding-bottom: 0.2vh;
        align-self: flex-end;
    }

    .content-name {
        font-weight: bold;
    }

    .middle {
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        gap: 0.5vw;
    }

    .powered-by {
        height: 1.2vh;
        align-self: flex-end;
    }

    .progress-player {
        flex: 5 1 auto;
        box-sizing: border-box;
        height: 60%;
        width: 100%;
        border: 0;
        background-color: #FAFAFA;
        border-radius: 15px;
    }

    .progress-bar {
        position: relative;
        background-color: #0BBA48;
        width: 5%;
        height: 100%;
        border-radius: 15px;

    }

</style>