<script>
    import { onDestroy } from "svelte";
    
    export let callback;
    export let ms = 100;

    const interval = setInterval(callback, ms);    
    onDestroy(() => {clearInterval(interval)});

</script>

<div class="game-tick"></div>