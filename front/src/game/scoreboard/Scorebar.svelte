<script>
    import { tweened } from "svelte/motion";
    import { cubicOut } from "svelte/easing";
    
    export let rounds;
    export let maxRounds;

    const scorebarProgress = tweened(0, {
        duration: 500,
        easing: cubicOut
    });

    $: scorebarProgress.set(rounds / maxRounds * 100);

</script>

<div class="scorebar">
    <div class="scorebar-progress" style="width: {$scorebarProgress}%;"></div>
</div>

<style>
    .scorebar {
        box-sizing: border-box;
        width: 100%;
        height: 0.8vh;
        border-radius: 1vh;
        background: #FAFAFA;
    }

    .scorebar-progress {
        position: relative;
        height: 100%;
        background: #5A5A5A;
        border-radius: 1vh;
    }
</style>