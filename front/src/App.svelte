<script>
    import Controller from "./Controller.svelte";

    // TODO: change spotify callback
    const params = new URLSearchParams(window.location.search);
    const showContent = !params.has("code");

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
            <Controller />
        </div>
        <div class="footer">
            <div class="footer-copyright">
                Copyright © 2023 Daniel Guimarães
                <a href="https://github.com/Leinadium/guessify">
                    <img class="icon" src='/assets/github-mark.svg' alt="Github">
                </a>
            </div>
            <div class="footer-description">
                Guessify has no association with Spotify.
                Guessify doesn't use cookies and doesn't track your data
            </div>
        </div>
    </div>
{:else}
    <p>Authenticated. You can close this window<p>
{/if}

<style>
    :global(html), :global(body) {
        margin: 0px;
        height: 100%;
        font-family: 'Circular Std', Sans-Serif, helvetica, Arial;
    }

    :global(span) {
        color:rgb(255, 255, 255)
    }

    .main {
        height: 100vh;
        position: relative;
        background-color: #151757;
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
        font-size: 5vmin;
        font-weight: 700;
    }

    .footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100vw;
        height: fit-content;
        margin-bottom: 1vmin;

        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        color: #B9B9B9;
    }

    .icon {
        height: 1.5vmin;
        aspect-ratio: 1 / 1;
    }

    .footer-copyright {
        font-size: 1.5vmin;
        font-weight: 300;
        display: flex;
        align-items: center;
        gap: 0.2vw;
    }

    .footer-description {
        font-size: 1.3vmin;
        font-weight: 100;
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