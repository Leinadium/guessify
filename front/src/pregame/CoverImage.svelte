<script>

    export let type = "empty";
    export let image;
</script>

{#if type === valid}
{:else if type === invalid}
{:else if type === notfound}
{:else if type === empty}
{/if}