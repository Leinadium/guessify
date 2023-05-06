<script>
    import { createEventDispatcher } from "svelte";
    import { fade } from "svelte/transition";
    import SomeButton from "./SomeButton.svelte";
    import ShareButton from "./ShareButton.svelte";
    import { getText } from "../../../lib/utils";
    import { language } from "../../../lib/stores";

    export let name;
    export let score;
    export let uri;

    let dispatch = createEventDispatcher();

    function playAgain() {
        console.log("play again")
        dispatch("playAgain");
    }

    function newGame() {
        console.log("new game")
        dispatch("newGame");
    }

</script>

<div class="buttons" in:fade="{{duration: 1000}}" on:introend>
    <ShareButton score={score} name={name} uri={uri}/>
    <div class="buttons-lower">
        <SomeButton text="{getText($language, 'game-playagain')}" on:click={playAgain}/>
        <SomeButton text="{getText($language, 'game-newgame')}" on:click={newGame}/>
    </div>
</div>

<style>

    .buttons {
        width: 80%;
        margin-top: 1vh;
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
        gap: 2.5vh;
    }

    .buttons-lower {
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
        align-items: center;

    }
</style>