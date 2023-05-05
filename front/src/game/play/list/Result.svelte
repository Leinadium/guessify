<script>
    import { fly, fade } from 'svelte/transition';
    import Text from '../../../common/Text.svelte';

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
    {#if selected}
        <div class="click-again" in:fade="{{duration: 200}}">
            <Text key="game-click-again" />
            <br>
            <Text key="game-click-again2" />
        </div>
    {:else}
        <div class="fade-left"></div>
    {/if}
</div>

<style>
    /* flex box S2 */
    .result {
        padding: 1vh;
        height: 6vh;
        width: 95%;
        border-radius: 1.5vh;

        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: stretch;
        gap: 1vh;
        background-color: #171717;
        position: relative;
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
        font-size: 3vh;
        font-weight: 500;
        color: #D9D9D9
    }

    .track-artists {
        font-size: 1.8vh;
        color: gray;
    }

    img {
        height: 100%;
        aspect-ratio: 1 / 1;
    }

    .result:hover {
        background-color: #2a2a2a;
        cursor: pointer;
    }

    .selected {
        background-color: #5a5a5a !important;
    }

    .click-again {
        position: absolute;
        right: 1vh;
        top: 0;
        height: 100%;
        border-radius: 1.5vh;
        padding-left: 40%;
        background: linear-gradient(90deg, rgba(90,90,90,0) 0%, rgba(90,90,90,1) 50%);
        font-size: 1.8vh;
        color: #aaa;
        text-align: center;
        
        display: flex;
        flex-flow: column;
        justify-content: center;
        width: fit-content;
    }

    .fade-left {
        position: absolute;
        top: 0;
        right: 0;
        border-radius: 1.5vh;
        background: linear-gradient(90deg, rgba(23,23,23,0) 0%, rgba(23,23,23,1) 50%);
        width: 20%;
        height: 100%;
    }
</style>