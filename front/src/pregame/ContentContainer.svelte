<script>
    import { createEventDispatcher } from "svelte";
    import ContentBox from "../common/ContentBox.svelte";
    import { getImage } from "../lib/utils";

    export let content;
    export let loaded = false;
    export let isSelected = true;   // false if user has loaded from url
    
    let selectedUri = "";           // uri from spotify
    let selectedIndex = -1;         // index of content

    let dispatch = createEventDispatcher();

    function update() {
        // using events instead of bind? this seems more right...
        dispatch("select", {
            uri: selectedUri,
            type: "select",
            name: content[selectedIndex].name
        });
    }
    
    // DISABLED: I don't want to bind to a element just to scroll
    // to much work. Well, TODO
    function onKeyPress(e) {
        console.log(e);

        if (selectedIndex === -1) {
            selectedIndex = 0;
        }
        // increment
        if (e.key === "ArrowDown") {
            if (selectedIndex < content.length - 1) selectedIndex++;
        }
        // decrement
        else if (e.key === "ArrowUp") {
            if (selectedIndex > 0) selectedIndex--;
        }
        
        selectedUri = content[selectedIndex].uri;
        update();

        // TODO: handle auto scroll
    }

    function onClick(uri, index) {
        selectedUri = uri;
        selectedIndex = index;
        update();
    }

</script>

<!-- <svelte:window on:keydown={onKeyPress}></svelte:window> -->

<div class="container-background">
    <div class="container">
    {#if loaded}
        {#if content.length > 0}
            {#each content as p, i (p.id) }
                <ContentBox
                    name={p.name}
                    image={getImage(p.images)}
                    total={p.tracks.total}
                    externUrl={p.external_urls.spotify}
                    isSelected={isSelected && selectedUri === p.uri}
                    on:click="{() => onClick(p.uri, i)}"
                />
            {/each}
        {:else}
            <p>No albums or playlist found</p>
        {/if}
    {:else}
        <p>Loading...</p>
    {/if}
    </div>
</div>



<style>
    p {
        color: #8B8B8B;
        font-size: 1.5vw;
    }
    
    .container-background {     
        width: 80vmin;
        height: fit-content;
        background-color: black;
        padding: 1vmin 0 0.5vmax 1vmin;
        border-radius: 2vmin;
    }

    .container {
        height: 40vh;
        overflow-y: scroll;

        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
        gap: 1vh;
        padding: 2vmin 1vmin 2vh 1vmin;
        margin-right: 1vh;
        background-color: black;

        scrollbar-color: #999 black;
    }

    .container::-webkit-scrollbar-track {
        background: black;
    }
</style>