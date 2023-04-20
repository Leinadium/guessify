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
        return (
            v.name.toLowerCase() + " " + 
            v.artists.map((a) => a.name.toLowerCase()).join(" ")) + " " +
            v.album.name.toLowerCase();
    });

    let showStatusContent = [];
    let availableIndexes = [];

    // updates lists whenver the search has been updated
    $: searchedText, updateLists();
    function updateLists() {
        // list of indexes of musics with the searched term inside the parsed string above
        showStatusContent = parsedContent.map((v) => v.includes(searchedText.toLowerCase()));

        // list of current available indexes to be selected
        availableIndexes = showStatusContent.reduce((acc, v, i) => {
            if (v) { return [...acc, i] }
            return acc;
        }, [])

        // if results is empty
        if (availableIndexes.length === 0) {
            selectedIndex = -1;
            indexAvailable = -1;
        } 
        // if there are some results, select the first one
        else {
            indexAvailable = 0;
            selectedIndex = availableIndexes[0];
        }
        // console.log("indexA: ", indexAvailable, " selectedI: ", selectedIndex);
    }

    // increment the indexes
    function incSelected() {
        if (selectedIndex === -1 && availableIndexes.length > 0) {
            indexAvailable = 0;
            selectedIndex = 0;
        } else if (indexAvailable < availableIndexes.length - 1) {
            indexAvailable = indexAvailable + 1;
            selectedIndex = availableIndexes[indexAvailable];
        }
        
    }

    // decrement the indexes
    function decSelected() {
        if (indexAvailable > 0) {
            indexAvailable = indexAvailable - 1;
            selectedIndex = availableIndexes[indexAvailable];
        }
    }

    // handle a direct click to a result
    function handleResultClick(trueIndex) {
        if (selectedIndex === trueIndex) {
            dispatch("submit", {})
        }
        selectedIndex = trueIndex;
        indexAvailable = availableIndexes.indexOf(trueIndex);
    }

    // handle all the key presses during the game
    function handleKey(e) {
        // increment
        if (e.key === "ArrowDown") {
            e.preventDefault();
            incSelected();
        }
        // decrement
        else if (e.key === "ArrowUp") {
            e.preventDefault();
            decSelected()
        };
        // submit
        if ((e.key === "Enter" ) && selectedIndex != -1) {
            dispatch("submit", {})
        }
    }

</script>

<svelte:window on:keydown={handleKey}></svelte:window>

<div class="wrapper">
    <div class="results">
        {#each fullContent as music, i (music.uri)}
            {#if (showStatusContent[i])}
                <Result 
                    content={music} 
                    selected={i===selectedIndex}
                    on:click="{() => {handleResultClick(i)}}"
                />
            {/if}
        {/each}
    </div>
</div>


<style>
    .wrapper {
        width: 70%;
        height: 50vh;
        padding: 1vmin;
        background: #121212;
        border-radius: 2vmin;

        display: flex;
        flex-flow: column nowrap;
    }
    .results {
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        overflow-y: scroll;
        gap: 1vmin;

        width: 99%;
        margin-left: 1%;
        height: 100%;    
        overflow-y: scroll;
    }
</style>