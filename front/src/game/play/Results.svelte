<script>
    import Result from "./Result.svelte";

    export let content = [];

</script>


<div>
    {#each content as music}
        <Result content={music}/>
    {/each}
</div>