<script>
    import { onDestroy } from "svelte";
    
    export let ms = 100;
    export let currentInfo;

    $: maxDurationMs = currentInfo.musicInfo['duration_ms']

    // updates the .playedMs value
    function callback() {
        
        currentInfo.playedMs += ms;

        if (currentInfo.playedMs >= maxDurationMs) {
            currentInfo.playedMs = maxDurationMs;
        }

        currentInfo = currentInfo;
    }

    const interval = setInterval(callback, ms);    
    onDestroy(() => {clearInterval(interval)});

</script>

<div class="game-tick"></div>