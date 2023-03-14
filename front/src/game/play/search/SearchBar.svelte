<script>
    export let searchedText = "";
    export let enableSubmit = false;
</script>

<div>
    <input type="text" bind:value={searchedText}>
    <button disabled="{!enableSubmit}">Submit</button>
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