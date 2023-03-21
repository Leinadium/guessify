<script>
    import Controller from "./Controller.svelte";
</script>

<svelte:head>
    <link href="https://fonts.cdnfonts.com/css/circular-std" rel="stylesheet">
</svelte:head>

<div class="main">
    <!-- HEADER -->
    <div class="header">
        <div class="header-title">Guessify</div>
        <div class="header-actions">
            <div class="share">
                <img class="icon" src="/assets/share-icon.svg" alt="Share">
            </div>
            <div class="github">
                <a href="https://github.com/Leinadium/guessify">
                    <img class="icon" src="/assets/github-mark.svg" alt="Github Logo">
                </a>
            </div>
        </div>
    </div>
    <!-- MAIN CONTENT -->
    <div class="content">
        <Controller />
    </div>
    <div class="footer">
        <div class="footer-copyright">Leinadium @ 2023</div>
    </div>
</div>


<style>
    :global(html), :global(body) {
        margin: 0px;
        height: 100%;
    }

    :global(spam) {
        color:rgb(255, 255, 255)
    }

    .main {
        height: 100vh;
        position: relative;
        background-color: #151757;
    }


    .header {
        width: 100vw;
        height: 10vh;
        
        background: rgb(51,56,214);
        background: linear-gradient(0deg, rgba(51,56,214,1) 0%, rgba(51,56,214,1) 16%, rgba(51,56,214,1) 100%); 

        /* background: linear-gradient(0deg, rgba(0,32,51,1) 0%, rgba(7,46,121,1) 40%, rgba(0,42,83,1) 100%); */
        box-shadow: 0px 4px 16px rgba(17,17,26,0.1), 0px 8px 24px rgba(17,17,26,0.1), 0px 16px 56px rgba(17,17,26,0.1);
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
    }

    .header-title {
        color: rgb(255, 255, 255);
        font-size: 6vh;
        font-family: 'Circular Std';
        font-weight: 700;
        padding-left: 5vw;
    }

    .header-actions {
        height: 4vh;
        padding-right: 3vw;
        display: flex;
        flex-flow: row nowrap;
        gap: 2vw;
    }

    .icon {
        height: 4vh;
        aspect-ratio: 1 / 1;
    }

    .footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100vw;
        height: 5vh;

        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: stretch;
    }

    .footer-copyright {
        color: rgb(158, 158, 158);
        font-size: 2vh;
        font-family: 'Circular Std';
        font-weight: 300;
        
        display: flex;
        align-items: center;
    }

    .content {
        width: 80vw;
        height: 85vh;
        margin-left: 10vw;
        margin-right: 10vw;
    }
</style>