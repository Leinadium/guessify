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
        gap: 10vh;
        padding-top: 5vh;
    }

    .wrapper-box {
        width: 60%;
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