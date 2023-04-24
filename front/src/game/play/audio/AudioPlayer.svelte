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
        justify-self: end;
        align-self: end;

        color: #999999;
        font-size: 1.5vh;
        height: 1.8vh;
    }

    @media screen and (max-width: 800px) {
        .now-playing {
            display: none;
        }
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
        gap: 0.5vh;
    }

    .current-time {
        color: #fff;
        font-size: 2vh;
        font-weight: 100;
        width: fit-content;
        padding-right: 0.3vh;
    }

    .powered-by {
        grid-area: poweredby;
        justify-self: end;
        align-self: start;
    }

    .progress-player {
        box-sizing: border-box;
        height: 1vh;
        width: 90%;
        border: 0;
        background-color: #FAFAFA;
        border-radius: 1vh;
    }

    .progress-bar {
        position: relative;
        background-color: #0BBA48;
        width: 5%;
        height: 100%;
        border-radius: 1vh;

    }

</style>