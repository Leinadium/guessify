<script>
    import ContentBox from "../../common/ContentBox.svelte";
    import StartButton from "./StartButton.svelte";
    
    export let enable = false;
    export let loading = {
        text: "",
        progress: 0
    };
    export let maxRounds = 5;

</script>

<div class="start-screen">
    <div class="wrapper-box">
        <spam class="content-header">Playlist/Album selected:</spam>
        <ContentBox />
    </div>
    

    <StartButton />
</div>"



{#if enable }
    <button on:click>Start</button>
{:else }
    <span>Loading...</span>
{/if}


<style>
    .start-screen {
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;    
        justify-content: flex-start;
        gap: 10vh;
        padding-top: 5vh;
    }

    .wrapper-box {
        width: 80%;
        display: flex;
        flex-flow: column nowrap;
        gap: 0.3vh;
        align-items: center;
    }

    .content-header {
        color: #ffffff;
        font-size: 500;
    }
</style>