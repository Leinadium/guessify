<script>
    // https://developer.spotify.com/documentation/web-api/reference/#/operations/get-featured-playlists
    export let image;
    export let name;
    export let total;
    export let externUrl;
    export let isSelected = false;
    export let isUnique = false;
    export let expand = false;
        
</script>


<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="content-box" class:selected={isSelected} class:expand={expand} on:click>
    {#if image !== null}
        <img class="image" src={image} alt={name}>
    {:else}
        <div class="image image-not-found"></div>
    {/if}

        <div class="texts">
        <spam class="name">{name}</spam>
        <spam class="total">
            {total} 
            {#if isUnique}unique {/if} 
            track{#if (total != 1)}s{/if}
        </spam>
    </div>
    
    <div class="powered-by">
        <a href="{externUrl}" class="extern">
            <spam>Open in</spam>
            <img class="open-in-logo" src="/assets/spotify-logo-green.png" alt="Spotify logo">
        </a>
    </div>
    
</div>


<style>
    .content-box {
        flex-shrink: 0;
        width: 95%;
        height: min(6vh, 8vw);
        padding: 1vh 1vh 1vh 1vh;
        background: linear-gradient(270deg, rgba(24,20,20,1) 30%, rgba(29,185,84,0.48156682027649766) 100%);  
        border-radius: 10px;
        
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        gap: 1vw;
        cursor: pointer;

        position: relative;
    }

    .expand {
        /* ????? css is hard */
        width: 97% !important;
    }

    .selected {
        /* background: rgb(69, 199, 22, 0.7); */
        background: #16873D;
    }

    .image-not-found {
        background-color: transparent;
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
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 2vmin;
        font-weight: bold;
    }
    .total {
        font-size: 1.5vh;
        font-weight: 300;
    }

    .powered-by {
        position: absolute;
        bottom: 0.3vh;
        right: 0.3vw;

        height: fit-content;
    }
    .extern {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
        align-items: flex-end;
        width: fit-content;
        gap: 0.3vw;
        text-decoration: none;
        width: fit-content;
    }

    .extern > spam {
        color: #1ED760;
        font-size: 1.2vh;
        font-weight: 500;

        white-space: nowrap;
    }

    .open-in-logo {
        height: 1.5vh;
        aspect-ratio: 3.37 / 1;
    }
</style>