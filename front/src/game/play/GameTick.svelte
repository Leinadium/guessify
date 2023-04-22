<script>
    import { onDestroy } from "svelte";
    import { isPlaying } from "../../lib/stores";

    export let ms = 100;
    export let currentInfo;

    $: maxDurationMs = currentInfo.musicInfo['duration_ms']

    // updates the .playedMs value
    function callback() {
        
        if ($isPlaying) { currentInfo.playedMs += ms; }
        currentInfo.roundMs += ms;

        if (currentInfo.playedMs >= maxDurationMs) {
            currentInfo.playedMs = maxDurationMs;
            currentInfo.roundMs = maxDurationMs;
        }

        currentInfo = currentInfo;
    }

    const interval = setInterval(callback, ms);    
    onDestroy(() => {clearInterval(interval)});

</script>

<div class="game-tick"></div>