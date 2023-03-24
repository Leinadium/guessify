<script>
    import ContentBox from "./ContentBox.svelte";
    import { getImage } from "../lib/utils";

    export let content;
    export let loaded = false;

</script>


<div class="container-background">
    <div class="container">
    {#if loaded}
        {#if content.length > 0}
            {#each content as p (p.id) }
                <ContentBox
                    name={p.name}
                    image={getImage(p.images)}
                    total={p.tracks.total}
                    externUrl={p.external_urls.spotify}
                />
            {/each}
        {:else}
            <p>No content found</p>
        {/if}
    {:else}
        <p>Loading...</p>
    {/if}
    </div>
</div>



<style>
    p {
        color: white;
        font-family: 'Circular Std';
        font-size: 1.5vw;
    }
    
    .container-background {
        width: fit-content;
        height: fit-content;
        background-color: black;
        padding: 0.5vw;
        border-radius: 1vw;
    }

    .container {
        width: 40vw;
        height: 50vh;
        overflow-y: scroll;

        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
        gap: 1vh;
        padding: 2vh 1vw 2vh 1vw;
        background-color: black;
    }
</style>