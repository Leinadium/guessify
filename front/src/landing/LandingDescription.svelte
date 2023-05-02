<script>
    import { fade, fly } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
    import Text from '../common/Text.svelte';
    
    let dispatch = createEventDispatcher();
    let page = "main";      // main, tutorial, about
    let nextPage = "none";

    function clear(next) {
        page = "none";
        nextPage = next;
    }

    function update() {
        page = nextPage;
        dispatch("outroend");
    }

</script>

<div class="landing-description">
    <div class="texts">
        {#if page === "main"}
            <div 
                class="short-description" 
                in:fly="{{ y: 30, duration: 1000}}" out:fade
                on:outroend={update}
            >
                <Text key="landing-title" />
            </div>
            
            <div 
                class="long-description" 
                in:fly="{{ y: 30, duration: 1000}}" out:fade
            >
                <Text key="landing-description" />
            </div>
        
        {:else if page === "about"}
            <div transition:fly="{{ x: -200, duration: 500}}" on:outroend={update}>
                <!-- TODO: about description -->
                <Text key="landing-about-content" />
            </div>
        {:else if page === "tutorial"}
                <!-- TODO: tutorial description -->
            <div transition:fly="{{ x: 200, duration: 500 }}" on:outroend={update}>
                <Text key="landing-tutorial-content" />
            </div>
        {/if}
    </div>
    
    <!-- svelte-ignore a11y-invalid-attribute -->
    <div class="pagination">
        {#if page === "main"}
            <a href="#" style="text-align: right" class="goto goto-text" on:click|preventDefault="{() => clear("about")}">
                <Text key="landing-about" />
            </a>
            <span class="goto">|</span>
            <a href="#" style="text-align: left" class="goto goto-text" on:click|preventDefault="{() => clear("tutorial")}">
                <Text key="landing-tutorial" />
            </a>
        {:else}
            <a href="#" style="text-align: center"class="goto goto-text" on:click|preventDefault="{() => clear("main")}">
                <Text key="landing-goback" />
            </a>
        {/if}
    </div>
    
</div>



<style>
    .landing-description {
        width: 100%;
        height: 50%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        align-items: center;
        gap: 10%;
    }

    .texts {
        height: fit-content;
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
        text-align: center;
        color: #ffffff;
    }

    .short-description {
        color: #fff;
        font-size: 8vmin;
        font-weight: 700;
        margin-bottom: 8vmin;
    }

    .long-description {
        color: #fefefe;
        font-size: 4vmin;
        font-weight: 300;
    }

    .pagination {
        width: 50%;
        gap: 3vmax;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-evenly;
    }

    .goto {
        color: #717171;
        font-weight: 500;
        font-size: 4vmin;
    }

    .goto-text {
        width: 30vw;
    }

</style>