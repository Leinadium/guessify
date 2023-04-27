<script>
    import Controller from "./Controller.svelte";
    import { fade } from "svelte/transition";

    // TODO: change spotify callback
    const params = new URLSearchParams(window.location.search);
    const showContent = !params.has("code");

    let showFullCopyright = true;
    $: heightCopyright = showFullCopyright? "4vh" : "2vh";

</script>

<svelte:head>
    <link href="https://fonts.cdnfonts.com/css/circular-std" rel="stylesheet">
</svelte:head>

{#if showContent}
    <div class="main">
        <div class="header">
            <a class="header-title" href="/">Guessify</a>
        </div>
        <div class="content">
            <Controller bind:showFullCopyright />
        </div>
        <div class="footer" style="height: {heightCopyright}">
            <div class="footer-copyright">
                Copyright © 2023 Daniel Guimarães
                <a class="icon" href="https://github.com/Leinadium/guessify">
                    <img class="icon" src='/assets/github-mark.svg' alt="Github">
                </a>
            </div>
            {#if showFullCopyright}
                <div class="footer-description" out:fade>
                    <span>Guessify has no association with Spotify.</span>
                    <span>Guessify doesn't use cookies and doesn't track your data.</span>
                </div>
            {/if}

        </div>
    </div>
{:else}
    <p>Authenticated. You can close this window<p>
{/if}

<style>
    :global(html), :global(body) {
        margin: 0px;
        height: 100%;
        font-family: 'Circular Std', sans-serif, helvetica, arial;
    }

    .main {
        height: 100vh;
        position: relative;
        /* background-color: #151757; */
        background: linear-gradient(0deg, rgba(18,18,18,1) 3%, rgba(21,23,87,1) 59%);
    }

    .header {
        width: 100vw;
        height: 8vh;        
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
    }

    .header-title {
        text-decoration: none;
        color: #ffffff;
        font-size: 5vh;
        font-weight: 700;
    }

    .footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100vw;
        padding-bottom: 1vh;
        padding-top: 1vh;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        color: #B9B9B9;
        background: rgba(0, 0, 0, 0.2);
        transition: height 1s ease-out;
    }

    .icon {
        height: 1.8vh;
        aspect-ratio: 1 / 1;
    }

    .footer-copyright {
        font-size: 2vh;
        font-weight: 300;
        display: flex;
        align-items: center;
        gap: 1vh;
    }

    .footer-description {
        font-size: 1.5vh;
        text-align: center;
        font-weight: 100;
        padding: 0 10vw;
    }

    .content {
        width: 80vw;
        height: 85vh;
        margin-left: 10vw;
        margin-right: 10vw;

        display: flex;
        flex-flow: column nowrap;
        align-items: center;
    }
</style>