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

<div class="error-message" in:fly="{{y: -100, duration: 300}}" out:fade>
    <div class="header">
        <spam class="error-big">Error :(</spam>
        <spam class="title">{title}</spam>
    </div>
    
    <p class="quick-description">{quickDescription}</p>
    
    <div class="footer">
        <spam class="quick-description">Full error description:</spam>
        <p class="full-description">{fullDescription}</p>
    </div>
    
    
    <button on:click={close}>
        <img class="close" src="/assets/close.svg" alt="Close">
    </button>
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
        --error-size: min(50vh, 50vw);

        position: absolute;
        top: calc(50vh - var(--error-size) / 2);
        left: calc(50vw - var(--error-size) / 2);
        width: var(--error-size);
        height: var(--error-size);
        z-index: 12;

        display: inline-flex;
        background-color: #575757;
        flex-flow: column nowrap;
        justify-content: space-between;
        align-items: center;
        color: #ffffff;
        text-align: center;
        padding: 1vmin 1vmax 1vmin 1vmax;
        border-radius: 2vmin;
    }

    .header, .footer {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
    }

    .error-big {
        font-size: 6 vmin;
        font-weight: 500;
    }

    .title {
        font-size: 3vmin;
    }

    .quick-description {
        font-size: 2vmin;
    }

    spam.quick-description {
        margin-bottom: 1vmin;
    }

    .full-description {
        margin-top: 0;
        font-size: 1.5vmin;
        color: #AAAAAA;
    }

    button {
        position: absolute;
        top: 0;
        right: 0%;
        margin: 1vmin;
        width: 6vmin;
        height: 6vmin;

        padding: 0;
        background-color: transparent;
        border: 0;
    }

    .close {
        width: 100%;
        aspect-ratio: 1 / 1;
    }

</style>