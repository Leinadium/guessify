<script>
    import { fly, fade } from 'svelte/transition';

    export let content;
    export let selected;

    const trackName = content.name
    const artists = content.artists.map((e) => e.name).join(", ");
    const trackAlbumName = content.album.name;
    const trackAlbumImg = content.album.images[0].url;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div 
    class="result" class:selected on:click
    in:fly|local="{{ y: 30, duration: 300}}"
    out:fade|local="{{duration: 100}}"
>    
    <img class="track-image" src={trackAlbumImg} alt={trackAlbumName}>
    <div class="track-text">
        <div class="track-name">{trackName}</div>
        <div class="track-artists">{artists}</div>
    </div>
</div>

<style>
    /* flex box S2 */
    .result {
        padding: 1vmin;
        height: 6vmin;
        width: 95%;
        border-radius: 1.5vmin;

        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: stretch;
        gap: 1vmin;
        background-color: #171717;
    }

    .track-text {
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        align-items: stretch;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

    }

    .track-name {
        font-size: 3vmin;
        font-weight: 500;
        color: #D9D9D9
    }

    .track-artists {
        font-size: 1.8vmin;
        color: gray;
    }

    img {
        height: 100%;
        aspect-ratio: 1 / 1;
    }

    .result:hover {
        background-color: #0bba48ad;
        cursor: pointer;
    }

    .selected {
        background-color: #0BBA48 !important;
    }
</style>