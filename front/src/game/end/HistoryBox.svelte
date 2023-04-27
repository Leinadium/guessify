<script>
    // yeah it is a copy of a ContentBox for the 4th time

  import PoweredBy from "../../common/PoweredBy.svelte";

    export let track;
    export let score;
    export let playedMs;

    const name = track.name;
    const artists = track.artists.map((e) => e.name).join(", ");
    const img = track.album.images[0].url;
    const icon = score > 0 ? ["/assets/correct.svg", "Correct"] : ["/assets/wrong.svg", "Wrong"];
    const extern = track.external_urls.spotify;

</script>

<div class="history-box">
    <img class="cover" src={img} alt="Cover">
    <div class="text">
        <span class="text-name">{name}</span>
        <span class="text-artists">{artists}</span>
    </div>
    <div class="info">
        <span class="info-time">
            {(playedMs / 1000).toFixed(1)}s
        </span>
        <img class="info-icon" src={icon[0]} alt={icon[1]}>
    </div>
</div>

<style>
    .history-box {
        position: relative;
        background: #171717;
        color: #fff;    /* remove */
        width: 100%;
        height: 7vh;
        padding: 1vh;
        border-radius: 1vh;

        display: flex;
        flex-flow: row nowrap;
        justify-content: stretch;
        align-items: stretch;
        gap: 1vh;
        margin-bottom: 1vh;
    }

    .cover {
        height: 100%;
        aspect-ratio: 1 / 1;
    }

    .text {
        width: calc(100% - 8vh);
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: flex-start;
        gap: 0.5vh;
    }

    .text-name {
        width: 100%;
        font-size: 2.5vh;
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        color: #D9D9D9;
    }

    .text-artists {
        width: 100%;
        font-size: 1.8vh;
        font-weight: 100;
        white-space: nowrap;
        overflow: hidden;
        color: gray;
    }

    .info {
        position: absolute;
        height: 8vh;
        padding-bottom: 2vh;
        width: fit-content;
        padding-left: 10%;
        top: 0;
        right: 0;
        background: linear-gradient(90deg, rgba(23,23,23,0) 0%, rgba(23,23,23,1) 20%);
        border-radius: inherit;
        
        
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
        align-items: center;
        gap: 0.5vh;
    }

    .info-icon {
        margin-right: 2vh;
        height: 30%;
        aspect-ratio: 1 / 1;
    }

    .info-time {
        color: #aaa;
        font-size: 2.2vh;
    }
</style>