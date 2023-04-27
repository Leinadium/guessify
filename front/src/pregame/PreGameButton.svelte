<script>
    export let loading = false;
    export let valid = true;
    export let name = "";

</script>
{#if loading}
    <button class="btn-play loading">
        <img class="loading-icon" src="/assets/spin.svg" alt="Loading">
    </button>
{:else if valid}
    <button class="btn-play" class:valid={valid} on:click>
        <span class="play">Play</span>
        <span class="name">{name}</span>       
    </button>
{:else}
    <button class="btn-play disabled">
        <span class="play">Play</span>      
    </button>
{/if}


<style>
    .btn-play {
        height: 7.5vh;
        aspect-ratio: 4 / 1;
        border-radius: 3vh;
        border: 0px;
        box-sizing: border-box;
        cursor: pointer;
        padding-left: 2vw;
        padding-right: 2vw;

        background-color: #3034BA;
        box-shadow: 0px 4px 16px rgba(17,17,26,0.1), 0px 8px 24px rgba(17,17,26,0.1), 0px 16px 56px rgba(17,17,26,0.1);
        
        display: inline-flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        transition: all 0.4s;
    }

    .btn-play:hover {
        background-color: rgb(5, 23, 219);
    }

    .disabled {
        background-color: #777 !important;
        cursor: not-allowed;
    }

    .disabled > .play {
        color: #aaa !important;
    }

    .play {
        font-size: 3vh;
        font-weight: bold;
        color: #fff;
    }

    .name {
        font-size: 1.8vh;
        font-weight: 600;
        width: 100%;
        color: #aaa;
        white-space: nowrap;
        overflow: hidden;
    }

    .loading-icon {
        height: 5vh;
        aspect-ratio: 1 / 1;
    }
</style>
