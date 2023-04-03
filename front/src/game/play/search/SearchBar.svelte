<script>
    import { onMount } from "svelte";
    
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

<div>
    <input type="text" bind:value={searchedText} bind:this={inputElement}>
    <button disabled="{!enableSubmit}" on:click>Submit</button>
</div>

<style>
    div {
        display: flex;
        justify-content: space-between;
    }
    button {
        width: 15%;
    }

    button:disabled {
        background-color: black;
    }
    input {
        font-size: 30px;
        width: 80%;
        height: 40px;
    }
</style>