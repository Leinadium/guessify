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

    <div class="track-image">
        <img src={trackAlbumImg} alt={trackAlbumName}>
    </div>

    <div class="track-text">
        <div class="track-name-artist">
            <div class="track-name">{content.name}</div>
            <div class="track-artist">{artists}</div>
        </div>
        
        <div class="track-album-name">{trackAlbumName}</div>
    </div>
</div>

<style>
    /* flex box S2 */

    .result {
        border: 2px solid black;
        padding: 5px;
        margin: 10px;

        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: stretch;
        gap: 10px;
    }

    .track-text {
        display: flex;
        flex-flow: column nowrap;
        justify-content: stretch;
        align-items: stretch;
        gap: 10px;
    }

    .track-name-artist {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
    }

    .track-name {
        font-size: 5vh;
        font-weight: bold;
    }

    .track-name-artist {
        font-size: 4vh;
    }

    .track-album-name {
        font-size: 3vh;
        font-style: italic;
        color: gray;
    }

    .track-image img {
        height: 10vh;
        aspect-ratio: 1 / 1;
    }

    .result:hover {
        background-color: lightgreen;
        cursor: pointer;
    }

    .selected {
        background-color: lightgreen !important;
    }
</style>