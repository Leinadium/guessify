<script>
    export let content;
</script>

<div>
    <spam>{content.name}</spam> ({content.artist})
</div>

<style>
    spam {
        font-weight: bold;
    }
</style>