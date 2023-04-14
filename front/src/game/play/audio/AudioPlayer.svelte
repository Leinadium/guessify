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

    // TODO: refazer o player como grid
</script>

<spam class="now-playing">Now playing from: <spam class="content-name">{contentName}</spam></spam>

<div class="progress">
    <spam class="current-time">{currentTimeStr}</spam>
    <div class="progress-player">
        <div class="progress-bar" style="width: {safeCurrent / safeMax * 100}%;"></div>
    </div>
</div>

<div class="powered-by">
    <PoweredBy externUrl="https://open.spotify.com/" text="Powered by"/>
</div>

<style>
    .now-playing {
        grid-area: nowplaying;
        justify-self: center;
        align-self: end;

        color: #EEEEEE;
        font-size: 1.2vmin;
        height: 1.2vmin;
    }

    .content-name {
        font-weight: bold;
    }

    .progress {
        grid-area: progress;
        place-self: stretch;

        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
        align-items: center;
        gap: 0.5vmin;
    }

    .current-time {
        color: #fff;
        font-size: 1.2vmin;
        width: 4vmin;
    }

    .powered-by {
        grid-area: poweredby;
        justify-self: end;
        align-self: start;
    }

    .progress-player {
        box-sizing: border-box;
        height: 40%;
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