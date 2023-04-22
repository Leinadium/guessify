<script>
    import { tweened } from "svelte/motion";
    import { cubicOut } from "svelte/easing";
    
    export let points;
    export let maxPoints;

    const scorebarProgress = tweened(0, {
        duration: 1000,
        easing: cubicOut
    });

    $: {
        if (maxPoints === 0) 
            scorebarProgress.set(0);
        else
            scorebarProgress.set(points / maxPoints * 100);
    }

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