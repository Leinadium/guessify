<script>
    import PoweredBy from "./PoweredBy.svelte";
  import Text from "./Text.svelte";

    // https://developer.spotify.com/documentation/web-api/reference/#/operations/get-featured-playlists
    export let image;
    export let name;
    export let total;
    export let externUrl;
    export let isSelected = false;
    export const isUnique = false;    // DEPRECIATED
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
        <span class="name">{name}</span>
        <span class="total">
            {total}
            
            <Text key="contentbox-track" />
            {#if (total != 1)}s{/if}
        </span>
    </div>
    
    
    <div class="powered-by">
        <PoweredBy externUrl={externUrl}/>
    </div>
    
</div>


<style>
    .content-box {
        flex-shrink: 0;
        width: 95%;
        height: 8vh;
        padding: 1vh;
        /* background: linear-gradient(270deg, rgba(24,20,20,1) 30%, rgba(29,185,84,0.48156682027649766) 100%);   */
        background: #171717;
        border-radius: 1vh;
        
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        gap: 1vh;
        cursor: pointer;

        position: relative;
    }

    .expand {
        /* ????? css is hard */
        width: 97% !important;
    }

    .selected {
        /* background: rgb(69, 199, 22, 0.7); */
        background: #5a5a5a;
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
        width: calc(95% - 8vh);
    }
    .name {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 2.5vh;
        font-weight: bold;
    }
    .total {
        font-size: 2vh;
        font-weight: 300;
    }
    .powered-by {
        position: absolute;
        bottom: 2vh;
        right: 1vh;

        height: 1vh;
    }
</style>