<script>
    import PoweredBy from "./PoweredBy.svelte";

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
        <PoweredBy externUrl={externUrl}/>
    </div>
    
</div>


<style>
    .content-box {
        flex-shrink: 0;
        width: 95%;
        height: 6vmin;
        padding: 1vmin;
        background: linear-gradient(270deg, rgba(24,20,20,1) 30%, rgba(29,185,84,0.48156682027649766) 100%);  
        border-radius: 10px;
        
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        gap: 1vmax;
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
        font-size: 1.5vmin;
        font-weight: 300;
    }
    .powered-by {
        position: absolute;
        bottom: 0.3vmin;
        right: 0.3vmin;

        height: fit-content;
    }
</style>