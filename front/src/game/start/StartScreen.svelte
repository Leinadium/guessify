<script>
    import { onMount } from "svelte";
    import ContentBox from "../../common/ContentBox.svelte";
    import StartButton from "./StartButton.svelte";
    import { getImage } from "../../lib/utils";
    
    
    export let loading = {
        text: "",
        progress: 0.3,
        done: false
    };
    export let content = {};

    const tips = [
        "Press ENTER to submit the selected track",
        "Click on a track to select, click again to submit",
        "You can search using the name of the track, album or artist(s)",
        "Use the arrow keys to navigate between tracks",
        "You gain more points by guessing the track faster",
        "A track can be played only once per game"
    ];

    let currentTip = "";

    onMount(() => {
        // choose a random tip
        currentTip = tips[Math.floor(Math.random() * tips.length)];
    })


</script>

<div class="start-screen">
    <div class="wrapper-box">
        <spam class="content-header">Playlist/Album selected:</spam>
        <ContentBox 
            name={content.name}
            image={getImage(content.images)}
            total={content.tracks.length}
            externUrl={content.link}
            isSelected={false}
            isUnique={true}
        />
    </div>

    {#if currentTip }
        <div class="tip">
            <spam class="tip-title">Tip: </spam>
            <spam class="tip-text">{currentTip}</spam>
        </div>
    {/if}

    <StartButton 
        loading={loading}
        on:start
    />
   
</div>


<style>
    .start-screen {
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;    
        justify-content: flex-start;
        gap: 10vmin;
        padding-top: 5vmin;
    }

    .wrapper-box {
        width: 80vmin;
        display: flex;
        flex-flow: column nowrap;
        gap: 0.3vmin;
        align-items: center;
    }

    .content-header {
        color: #ffffff;
        font-size: 500;
    }

    .tip {
        color: #CCC;
        width: 80vmin;
        display: flex;
        flex-flow: column nowrap;
        gap: 0.3vmin;
        align-items: center;
    }

    .tip-title {
        font-size: 2vmin;
        font-weight: bold;
    }

</style>