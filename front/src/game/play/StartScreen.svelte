<script>
    export let enable = false;
</script>

{#if enable }
    <button on:click>Start</button>
{:else }
    <spam>Loading...</spam>
{/if}