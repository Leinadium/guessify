<script>
    import { onMount } from "svelte";
    import { language } from "../../../lib/stores";
    import { getText } from "../../../lib/utils";
    import Text from "../../../common/Text.svelte";

    export let searchedText = "";
    export let enableSubmit = false;

    let inputElement;

    onMount(() => {
        inputElement.focus();

        // disabling keyup and keydown
        // https://stackoverflow.com/questions/22383952/detect-or-disable-cursor-movement-in-input-field
        inputElement.addEventListener('keydown', (e) => {
            if (e.key == "ArrowDown" || e.key == "ArrowUp")
                e.preventDefault();
        })
    })
</script>

<div class="search-bar">
    <div class="search">
        <img src="/assets/search.svg" alt="Search"/>
        <input type="text" 
            placeholder="{getText($language, 'game-listening')}"
            bind:value={searchedText} 
            bind:this={inputElement}
        >
    </div>
    
    <button disabled="{!enableSubmit}" on:click><Text key="game-guess" /></button>
</div>

<style>
    .search-bar {
        width: 60vw;
        height: 4vh;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        gap: 1vh;
    }
    button {
        width: fit-content;
        padding: 0 3vh 0 3vh;
        border-radius: 3vh;
        border: none;
        background-color: #0BBA48;
        color: #ffffff;
        font-size: 1.8vh;
        font-weight: bold;
        cursor: pointer;
    }

    button:disabled {
        cursor: not-allowed;
    }

    button:disabled {
        color: #bbb !important;
        background-color: #787878 !important;
    }
    .search {
        width: 80%;
        height: 100%;
        background: #D9D9D9;
        border-radius: 3vh;
        border: none;

        padding-left: 1vmin;

        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        gap: 1%;
        
    }

    img {
        height: 70%;
        aspect-ratio: 1 / 1;
    }
    
    input {
        height: 95%;
        width: 100%;
        white-space: nowrap;
        /* text-overflow: hidden; */
        background-color: transparent;
        border: none;
        font-size: 1.5vh;
    }

    input:focus {
        outline: none;
        border: none;
    }
</style>