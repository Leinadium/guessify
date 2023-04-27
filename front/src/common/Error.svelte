<script>
    import { fade, fly } from "svelte/transition";
    import { createEventDispatcher } from "svelte";

    export let show;
    export let title;
    export let quickDescription;
    export let fullDescription;

    let dispatch = createEventDispatcher();

    function close() {
        dispatch("close");
    }

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if show}
    <div class="black-fade" on:click={close} in:fade out:fade></div>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="error-message" in:fly="{{y: -100, duration: 300}}" out:fade on:click={close}>
        <div class="header">
            <span class="error-big">Error :(</span>
            <span class="title">{title}</span>
        </div>
        
        <p class="quick-description">{quickDescription}</p>
        
        <div class="footer">
            <span class="quick-description">Full error description:</span>
            <p class="full-description">{fullDescription}</p>
        </div>
    </div>

{:else}
    <div class="no-error"></div>
{/if}

<style>
    .black-fade {
        position: absolute;
        top: 0%;
        left: 0%;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 10;
    }

    .error-message {
        position: absolute;
        width: 80vw;
        height: 60vh;

        top: 20vh;
        left: 10vw;
        z-index: 12;

        display: inline-flex;
        background-color: #575757;
        flex-flow: column nowrap;
        justify-content: space-between;
        align-items: center;
        color: #ffffff;
        text-align: center;
        padding: 1vh;
        border-radius: 3vh;
    }

    .header, .footer {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
    }

    .error-big {
        font-size: 5vh;
        font-weight: 500;
        margin-bottom: 2vh;
    }

    .title {
        font-size: 3vh;
    }

    .quick-description {
        font-size: 2vh;
    }

    span.quick-description {
        margin-bottom: 1vh;
    }

    .full-description {
        margin-top: 0;
        font-size: 1.5vh;
        color: #AAAAAA;
    }

</style>