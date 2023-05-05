<script>
    import Text from "../../common/Text.svelte";
    export let info;
    export let success = false;

    const name = info.name
    const artists = info.artists.map((e) => e.name).join(", ");
    const image = info.album.images[0].url;
</script>

<div class="music-info">
    {#if !success}
        <span class="pretext">
            <Text key="game-correct-track" />
        </span>
    {:else}
        <span class="pretext">
            <Text key="game-you-guessed" />
        </span>
    {/if}
    <div class="wrapper">
        <img src={image} alt="Cover"/>
        <div class="texts">
            <span class="name">{name}</span>
            <span class="artists">{artists}</span>
        </div>
    </div>
</div>

<style>
    .music-info {
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
        gap: 0.5vh;
    }

    .pretext {
        font-size: 2vh;
        font-weight: 500;
        color: #fff;
    }

    .wrapper {
        display: flex;
        height: 30vh;
        width: 20vh;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
        padding: 3vh 2vh 2vh 2vh;
        background: #282828;
        border-radius: 2vh;

        gap: 1vh;
    }

    img {
        width: 90%;
        aspect-ratio: 1 / 1;
    }

    .texts {
        width: 100%;
        color: #fff;
        font-size: 2vh;

        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 0.5vh;
    }

    .name {
        width: 100%;
        height: 50%;
        color: #fff;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .artists {
        width: 100%;
        color: #a2a2a2;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>