<script>
    // https://developer.spotify.com/documentation/web-api/reference/#/operations/get-featured-playlists
    export let image;
    export let name;
    export let total;
    export let externUrl;
    
</script>


<div class="playlist-card">
    <img class="image" src={image} alt={name}>
    <span class="name">{name}</span>
    <span class="total">{total}</span>
    <span class="extern">Open in <img src="{externUrl}" alt="Spotify"></span>
</div>


<style>
    .playlist-card {
        width: fit-content;
        height: fit-content;
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: stretch;
    }
    
    .image {
        height: 10vh;
        aspect-ratio: 1 / 1;
    }

    .name {
        color: #191414;
    }
</style>