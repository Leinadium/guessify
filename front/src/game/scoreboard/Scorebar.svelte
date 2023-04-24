<script>
    import { tweened } from "svelte/motion";
    import { cubicOut } from "svelte/easing";
    import { MAX_SCORE } from "../../lib/utils";
    
    export let points;

    const scorebarProgress = tweened(0, {
        duration: 1000,
        easing: cubicOut
    });

    $: scorebarProgress.set(points / MAX_SCORE * 100);

</script>

<div class="scorebar">
    <div class="scorebar-progress" style="width: {$scorebarProgress}%;"></div>
</div>

<style>
    .scorebar {
        box-sizing: border-box;
        width: 100%;
        height: 1vh;
        border-radius: 1vh;
        background: #FAFAFA;
    }

    .scorebar-progress {
        position: relative;
        height: 100%;
        background: #0BBA48;
        border-radius: 1vh;
    }
</style>