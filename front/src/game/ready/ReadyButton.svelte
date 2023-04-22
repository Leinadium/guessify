<script>
    import { fade } from "svelte/transition";

    export let roundsToGo = 5;
</script>

<button on:click in:fade="{{duration: 500}}">
    <spam class="big">Next</spam>
    <spam class="small">{roundsToGo} round{roundsToGo > 1 ? "s" : ""} to go</spam>
</button>

<style>
    button {
        width: 30vh;
        height: 7.5vh;
        border: none;
        background: #3034BA;
        border-radius: 2vh;
        cursor: pointer;

        margin-top: 3vh;

        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-self: center;
    }

    .big {
        color: #eee;
        font-size: 3vh;
        font-weight: 800;
    }

    .small {
        color: #aaa;
        font-size: 1.8vh;
        font-weight: 500;
    }
</style>