<script>
    import { onDestroy, createEventDispatcher } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import { refreshToken, isAuthValid, username } from '../lib/stores';
    import SpotifyAuth from '../lib/SpotifyAuth.svelte';

    let showText = false;
    let initialTransition = setTimeout(() => {
        showText = true;
    }, 500);

    onDestroy(() => {
        clearTimeout(initialTransition);
    });

    let auth_error = "";
    let startAuth = false;
    function resetError() {
        auth_error = "";
        startAuth = false;
    }

    function resetAuth() {
        startAuth = false;
        dispatch("reset")
    }
    let dispatch = createEventDispatcher();

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
            {#if !$isAuthValid}
                <button class="btn-landing btn-login" in:fade on:click="{() => {startAuth = true;}}">
                    <span class="login">
                        Login with <img class="spotify-logo-button" src="/assets/spotify-logo-white.png" alt="Spotify">
                    </span>
                </button>
                <span class="requires">
                    Requires Spotify Premium
                </span>
            {:else}
                <!-- svelte-ignore a11y-invalid-attribute -->
                <a href="#" class="requires logout" on:click={resetAuth}>
                    Not {$username}? Logout
                </a>
                <button class="btn-landing btn-continue" in:fade on:click="{() => {dispatch('ready')}}">
                    <span class="continue">Play as</span>
                    <span class="continue-username">{$username}</span>
                </button>
            {/if}
            
        </div>
        
    {/if}

    <div>
        {#if startAuth && auth_error === "" }
        <SpotifyAuth
            on:error="{(e) => {auth_error = e.detail.description}}"
        />
    {/if}
    </div>
    
    {#if auth_error !== ""}
        <div class="black-fade"></div>
        <div class="error-message">
            <span>Authentication Error</span>
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

    .btn-landing {
        width: max(20vw, 25vh);
        aspect-ratio: 3 / 1;
        border-radius: max(3vw, 4vh);
        
        /* background-color: #1ed760; */
        /* background: rgb(34,237,106); */

        background-image: linear-gradient(to right, rgba(34,237,106,1) 0%, rgba(30,215,96,1) 100%); 

        border: 0px;
        box-sizing: border-box;
        cursor: pointer;

        box-shadow: 0px 4px 16px rgba(17,17,26,0.1), 0px 8px 24px rgba(17,17,26,0.1), 0px 16px 56px rgba(17,17,26,0.1);

        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;

        transition-duration: 0.4s;
    }

    .btn-landing:hover {
        transform: scale(1.03) perspective(1px);
    }

    .btn-login {
        background-image: linear-gradient(to right, rgba(34,237,106,1) 0%, rgba(29,185,84,1) 100%);
    }

    .btn-continue {
        background-image: linear-gradient(to right, rgb(34, 37, 237) 0%, rgba(30,215,96,1) 100%);
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

    .continue {
        font-family: 'Circular Std';
        font-size: max(1.6vw, 2vh);
        font-weight: bold;
        color: #fff;
    }

    .continue-username {
        font-family: 'Circular Std';
        font-size: max(1.2vw, 1.5vh);
        font-weight: 300;
        color: #fff;
        overflow: hidden;
    } 

    .spotify-logo-button {
        /* https://developer.spotify.com/documentation/general/design-and-branding/#using-our-logo */
        height: max(2.3vw, 2.87vh);
        padding-left: max(1.15vw, 1.435vh);
        aspect-ratio: 3.37 / 1;
    }

    .requires {
        margin-top: max(0.8vw, 1vh);
        font-family: 'Circular Std';
        font-size: max(0.8vw, 1.0vh);
        font-weight: 300;
        font-style: italic;
        color: #404040;
    }

    .logout {
        color: #a0a0a0 !important;
        margin-bottom: 1vh;
    }

    .logout:hover {
        cursor: pointer;
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