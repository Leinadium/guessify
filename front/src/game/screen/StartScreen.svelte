<script>
    export let enable = false;
</script>

{#if enable }
    <button on:click>Start</button>
{:else }
    <span>Loading...</span>
{/if}