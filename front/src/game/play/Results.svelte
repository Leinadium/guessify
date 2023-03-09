<script>
    import { musicSubmitted } from '../../lib/stores'; 
    import Result from "./Result.svelte";

    export let searchedText;
    export let fullContent = [];
    export let indexSelected = 0;

    // a list with only the name and the artist of a music 
    let parsedContent = fullContent.map(v => {
        return `${v.name.toLowerCase()} ${v.artist.toLowerCase()}`;
    });

    // list of indexes of musics with the searched term inside the parsed string above
    $: showStatusContent = parsedContent.map((v) => v.includes(searchedText));

    // list of current available indexes to be selected
    $: availableIndexes = showStatusContent.reduce((acc, v, i) => {
        if (v) { return [...acc, i] }
        return acc;
    }, [])
    let indexAvailable = 0;

    // updating indexSelected on text change
    $: { indexSelected = (availableIndexes.length === 0 || searchedText === "") ?
        -1 : indexSelected = availableIndexes[0]; 
    }

    // increment the indexes
    function incSelected() {
        if (indexAvailable < availableIndexes.length - 1) {
            indexAvailable++;
            indexSelected = availableIndexes[indexAvailable];
        }
    }

    // decrement the indexes
    function decSelected() {
        if (indexAvailable > 0) {
            indexAvailable--;
            indexSelected = availableIndexes[indexAvailable];
        }
    }

    // handle a direct click to a result
    function handleResultClick(trueIndex) {
        indexSelected = trueIndex;
        indexAvailable = availableIndexes.indexOf(trueIndex);
    }

    // handle all the key presses during the game
    function handleKey(e) {
        // increment
        if (e.key === "ArrowDown") incSelected();
        // decrement
        else if (e.key === "ArrowUp") decSelected();
        // submit
        if ((e.key === "Enter" || e.key === "Tab") && indexSelected != -1) {
            musicSubmitted.set(indexSelected);
        }
    }

</script>

<svelte:window on:keydown={handleKey}></svelte:window>

<div class="results">
    {#each fullContent as music, i (music.id)}
        {#if (showStatusContent[i] && searchedText != "")}
            <Result 
                content={music} 
                selected={i===availableIndexes[indexAvailable]}
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