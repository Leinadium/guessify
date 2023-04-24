<script>
    import { fade } from "svelte/transition";
    export let number = "0";
    export let text = "xxx";
    export let description = "xxx";
</script>

<div class="small-info" in:fade="{{duration: 200}}" on:introend>
    <div class="upper">
        <div class="number">{number}</div>
        <div class="text">{text}</div>
    </div>
    <div class="description">{description}</div>
</div>

<style>
    .small-info {
        height: fit-content;
        width: 80%;

        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
    }

    .upper {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: flex-end;
        gap: 0.3vh;
    }

    .number {
        color: #fff;
        font-size: 3vh;
        font-weight: 500;
    }

    .text {
        color: #ddd;
        font-size: 1.5vh;
        font-weight: 100;
        margin-bottom: 0.6vh;
    }

    .description {
        color: #787878;
        font-size: 1.3vh;
        font-weight: 500;
        text-align: center;
        transform: translateY(-0.5vh);

    }
</style>