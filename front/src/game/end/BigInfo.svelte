<script>
    import { fade } from "svelte/transition";

    export let number = "0";
    export let text = "points";
    export let description = "Overall score";
    export let color = "red";   // red / yellow / green

    let colorStyle = "red";
    // TODO: choose colors from pallet
    if (color === "red") {
        colorStyle = "#BA110B";
    } else if (color === "yellow") {
        colorStyle = "#BA9A14";
    } else if (color === "green") {
        colorStyle = "#0BBA48";
    }

</script>

<div class="big-info" in:fade="{{duration: 500}}" on:introend>
    <div class="upper" style:color={colorStyle}>
        <div class="info number">{number}</div>
        <div class="info text">{text}</div>
    </div>
    <div class="description">{description}</div>
</div>

<style>
    .big-info {
        height: 10vh;
        width: fit-content;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        gap: 0;
        color: #eee;
    }

    .upper {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: flex-end;
        gap: 0.1vh;
    }

    .number {
        font-size: 7vh;
        font-weight: 700;
    }

    .text {
        font-size: 3vh;
        font-weight: 500;
        margin-bottom: 1vh;
    }

    .description {
        font-size: 2vh;
        font-weight: 500;
        transform: translateY(-1vh);
    }
</style>