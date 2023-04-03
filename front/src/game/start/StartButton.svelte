<script>
    export let enable = false;
    export let loading = {
        text: "",
        progress: 0.5
    };

</script>

{#if !enable}
    <button class="btn-start" on:click>
        <div class="loading-progress" style="width: {loading.progress * 100}%"></div>
        <span class="start">Start</span>
    </button>
{/if}

<style>
    .btn-start {
        height: 7vh;
        aspect-ratio: 3 / 1;
        border-radius: 2vh;
        background: #787878;
        border: 0;
        position: relative;

        display: flex;
        flex-flow: column nowrap;
        align-items: center;
    }

    .loading-progress {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background: blue;
        border-radius: 2vh;
    }
</style>