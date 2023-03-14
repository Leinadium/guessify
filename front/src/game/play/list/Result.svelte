<script>
    import { fly, fade } from 'svelte/transition';

    export let content;
    export let selected;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div 
    class="result" class:selected on:click
    in:fly|local="{{ y: 30, duration: 300}}"
    out:fade|local="{{duration: 100}}"
>
    <spam>{content.name}</spam> ({content.artist})
</div>

<style>
    .result {
        border: 2px solid black;
        padding: 5px;
        margin: 10px;
    }

    .result:hover {
        background-color: lightcoral;
        cursor: pointer;
    }

    spam {
        font-weight: bold;
    }

    .selected {
        background-color: red !important;
    }
</style>