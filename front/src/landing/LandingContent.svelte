<script>
    import { onDestroy, createEventDispatcher } from 'svelte';
    import { refreshToken, isAuthValid, username } from '../lib/stores';
    import SpotifyAuth from '../lib/SpotifyAuth.svelte';

    import LandingButton from './LandingButton.svelte';
    import LandingDescription from './LandingDescription.svelte';
    import Error from '../commom/Error.svelte';

    let dispatch = createEventDispatcher();
    
    // enables the base description
    let showText = false;
    // if has error
    let hasError = true;
    // transitoin for base description 
    let initialTransition = setTimeout(() => {
        showText = true;
    }, 100);
    // error object
    let authError = {
        title: "Error retrieving your playlists",
        quickDescription: "Please ensure your internet connection is working, and your Spotify account has a valid Premium subscription",
        fullDescription: "Error retrieving from Spotify API: Spotify API returned 502 with message \" \""
    };
    // is authenticating
    let isAuthenticating = false;

    function startAuth() {
        isAuthenticating = true;
    }

    function startError(e) {
        hasError = true;
        isAuthenticating = false;
        authError.title = "Error while authenticating with Spotify";
        authError.quickDescription = "Something went wrong during authentication. Try again later."
        authError.fullDescription = e.detail.description;
    }
    
    // resets the page after an error
    function resetError() {
        hasError = false;      // resets the page to base
        isAuthenticating = false;  // enables auth
    }

    // resets the authentication
    function resetAuth() {
        isAuthenticating = false;
        hasError = false;
        dispatch("reset");      // propagating
    }

    onDestroy(() => {
        clearTimeout(initialTransition);
    });
</script>

<div class="landing">
    {#if showText}
        <LandingDescription />
        <LandingButton 
            valid={$isAuthValid}
            username={$username}
            on:auth={startAuth}
            on:reset={resetAuth}
            on:ready
        />
    {/if}
</div>

<Error 
    {...authError}
    show={hasError} 
    on:close={resetError}
/>

<div>
    {#if isAuthenticating }
        <SpotifyAuth on:error={startError} />
    {/if}
</div>


<style>
    
    .landing {
        height: 100%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        align-items: center;
    }

</style>