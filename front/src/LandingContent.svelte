<script>
    import { fade, fly } from 'svelte/transition';
    import { onDestroy } from 'svelte';
    import SpotifyAuth from './lib/SpotifyAuth.svelte';

    let showText = false;
    let initialTransition = setTimeout(() => {
        showText = true;
    }, 500);

    onDestroy(() => {
        clearTimeout(initialTransition);
    });

    let authentication = false;
    let auth_error = "";
    function resetError() {
        authentication = false;
        auth_error = "";
    }

</script>

<div class="landing">
    {#if showText}
        <div class="texts">
            <div class="short-description" in:fly="{{ y: 30, duration: 1000}}" out:fade>
                Do you know your music?
            </div>
            
            <div class="long-description" in:fly="{{ y: 30, duration: 1000}}" out:fade>
                Some description, some description some description some description some description!
            </div>
        </div>

        <div class="div-login">
            <spam class="requires">Requires Spotify Premium</spam>
            <button in:fade on:click="{() => {authentication = true;}}">
                <spam class="login">Login with <img class="spotify-logo-button" src="/assets/spotify-logo-white.png" alt="Spotify"></spam>
            </button>
        </div>
    {/if}

    {#if authentication && auth_error === "" }
        <SpotifyAuth 
            on:refresh
            on:error="{(e) => {auth_error = e.detail.description}}"
        />
    {/if}

    {#if auth_error !== ""}
        <div class="black-fade"></div>
        <div class="error-message">
            <spam>Authentication Error</spam>
            <p>An error occurred while authenticating with Spotify: {auth_error}</p>
            <button on:click={resetError}>Close</button>
        </div>
    {/if}
</div>


<style>
    div {
        font-family: 'Circular Std';
    }
    
    .landing {
        height: 100%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        align-items: center;
    }

    .texts {
        text-align: center;
    }

    .short-description {
        color: #fff;
        font-size: min(8vw, 10vh);
        font-weight: 700;
        margin-bottom: 10vh;
    }

    .long-description {
        color: #fefefe;
        font-size: min(4vw, 5vh);
        font-weight: 300;
    }

    button {
        width: max(20vw, 25vh);
        aspect-ratio: 3 / 1;
        border-radius: max(3vw, 4vh);
        
        /* background-color: #1ed760; */
        /* background: rgb(34,237,106); */

        background-image: linear-gradient(to right, rgba(34,237,106,1) 0%, rgba(30,215,96,1) 100%); 

        border: 0.2vw solid black;
        box-sizing: border-box;
        cursor: pointer;

        box-shadow: 0px 4px 16px rgba(17,17,26,0.1), 0px 8px 24px rgba(17,17,26,0.1), 0px 16px 56px rgba(17,17,26,0.1);

        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;

        transition-duration: 0.4s;
    }

    button:hover {
        transform: scale(1.03) perspective(1px);
    }

    .div-login {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
    }
    .login {
        font-family: 'Circular Std';
        font-size: max(1.6vw, 2vh);
        font-weight: bold;
        color: #fff;

        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 0.5vw;
    }

    .spotify-logo-button {
        height: max(2.3vw, 2.87vh);
        aspect-ratio: 3.37 / 1;
    }

    .requires {
        margin-top: max(0.8vw, 1vh);
        font-family: 'Circular Std';
        font-size: max(1.2vw, 1.5vh);
        font-weight: 300;
        font-style: italic;
        color: #f0f0f0;
    }

    .black-fade {
        display: none;
        position: absolute;
        top: 0%;
        left: 0%;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 10;
    }

    .error-message {
        display: flex;
        position: absolute;
        top: 25vh;
        left: 25%;
        width: 50%;
        height: 50%;
        padding: 16px;
        border: 16px solid orange;
        background-color: white;
        z-index: 12;
        overflow: auto;
    }


</style>