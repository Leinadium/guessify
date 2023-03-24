<script>
    // https://developer.spotify.com/documentation/web-api/reference/#/operations/get-featured-playlists
    export let image;
    export let name;
    export let total;
    export let externUrl;
    
</script>


<div class="content-box">
    {#if image}
        <img class="image" src={image} alt={name}>
    {:else}
        <div class="image image-not-found"></div>
    {/if}
    <div class="texts">
        <span class="name">{name}</span>
        <span class="total">{total} track{#if (total != 1)}s{/if}</span>
    </div>
    <a href="{externUrl}" class="extern">
        <img class="open-in-logo" src="/assets/spotify-icon-green.png" alt="Spotify logo">
    </a>
    
</div>


<style>
    .content-box {
        flex-shrink: 0;
        width: 95%;
        height: min(9vh, 6vw);
        padding: 1vh 1vh 1vh 1vh;
        background: rgb(24,20,20);
        background: linear-gradient(270deg, rgba(24,20,20,1) 30%, rgba(29,185,84,0.48156682027649766) 100%);  
        border-radius: 10px;
        
        display: flex;
        flex-flow: row nowrap;
        gap: 1vw;
        font-family: 'Circular Std';
    }

    .image-not-found {
        background-color: #181414;
    }
    
    .image {
        aspect-ratio: 1 / 1;
        height: 100%;
        align-self: center;
    }

    .texts {
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        color: #fff;
        width: 90%;
    }
    .name {
        white-space: break-spaces;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: min(1.5vh, 1.5vw);
        font-weight: bold;
    }
    .total {
        font-size: 1.2vh;
        font-weight: 300;
    }
    .extern {
        color: #fff !important;
        font-size: 1.2vh;
        font-weight: 300;
        font-style: italic;

        text-align: right;
        width: 10%;
    }

    .open-in-logo {
        height: 2vh;
        aspect-ratio: 1 / 1;
    }
</style>