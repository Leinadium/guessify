<script>
    import Result from "./Result.svelte";
    import { createEventDispatcher } from "svelte";

    export let searchedText;
    export let fullContent = [];
    export let selectedIndex = 0;
    let indexAvailable = 0;

    let dispatch = createEventDispatcher();

    // a list with only the name and the artist of a music 
    const parsedContent = fullContent.map(v => {
        return v.name.toLowerCase() + " " + v.artists.map((a) => a.name.toLowerCase()).join(" ");
    });

    let showStatusContent = [];
    let availableIndexes = [];

    $: {
        // list of indexes of musics with the searched term inside the parsed string above
        showStatusContent = parsedContent.map((v) => v.includes(searchedText));

        // list of current available indexes to be selected
        availableIndexes = showStatusContent.reduce((acc, v, i) => {
            if (v) { return [...acc, i] }
            return acc;
        }, [])

        // updating selectedIndex on text change
        if (availableIndexes.length === 0 || searchedText === "") {
            selectedIndex = -1;
        } else {
            indexAvailable = 0;
            selectedIndex = availableIndexes[0]; 
        }
        console.log("indexA: ", indexAvailable);
    }

    // increment the indexes
    function incSelected() {
        if (indexAvailable < availableIndexes.length - 1) {
            indexAvailable++;
            selectedIndex = availableIndexes[indexAvailable];
        }
    }

    // decrement the indexes
    function decSelected() {
        if (indexAvailable > 0) {
            indexAvailable--;
            selectedIndex = availableIndexes[indexAvailable];
        }
    }

    // handle a direct click to a result
    function handleResultClick(trueIndex) {
        selectedIndex = trueIndex;
        indexAvailable = availableIndexes.indexOf(trueIndex);
    }

    // handle all the key presses during the game
    function handleKey(e) {
        // increment
        if (e.key === "ArrowDown") incSelected();
        // decrement
        else if (e.key === "ArrowUp") decSelected();
        // submit
        if ((e.key === "Enter" ) && selectedIndex != -1) {
            dispatch("submit", {})
        }
    }

</script>

<svelte:window on:keydown={handleKey}></svelte:window>

<div class="results">
    {#each fullContent as music, i (music.id)}
        {#if (showStatusContent[i])}
            <Result 
                content={music} 
                selected={i===selectedIndex}
                on:click="{() => {handleResultClick(i)}}"
            />
        {/if}
    {/each}
</div>

<style>
    .results {
        width: 60%;
    }
</style>