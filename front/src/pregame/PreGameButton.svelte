<script>
    export let valid = true;
    export let name = "";

</script>

{#if valid}
    <button class="btn-play" class:valid={valid} on:click>
        <spam class="play">Play</spam>
        <spam class="name">{name}</spam>       
    </button>
{:else}
    <button class="btn-play disabled">
        <spam class="play">Play</spam>      
    </button>
{/if}


<style>
    .btn-play {
        width: 30vh;
        aspect-ratio: 4 / 1;
        border-radius: max(3vw, 4vh);
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
        transform: scale(1.10);
    }

    .disabled {
        background-color: #777;
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
        font-weight: 400;
        font-style: italic;
        width: 100%;
        color: #aaa;
        white-space: nowrap;
        overflow: hidden;
    }
</style>
