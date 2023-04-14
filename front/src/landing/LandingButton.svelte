<script>
    import { fade } from "svelte/transition";
    import { createEventDispatcher } from "svelte";

    export let valid = false;
    export let username = ""; 

    let dispatch = createEventDispatcher();

    function startAuth() {
        dispatch("auth");
    }

    function resetAuth() {
        dispatch("reset");
    }

</script>

<div class="div-login">
    {#if !valid}
        <span class="requires">
            Requires Spotify Premium
        </span>
        <button class="btn-landing btn-login" in:fade on:click={startAuth}>
            <span class="login">
                Login with <img class="spotify-logo-button" src="/assets/spotify-logo-white.png" alt="Spotify">
            </span>
        </button>
    {:else}
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a href="#" class="requires logout" on:click={resetAuth}>
            Not {username}? Logout
        </a>
        <button class="btn-landing btn-continue" in:fade on:click="{() => {dispatch('ready')}}">
            <span class="continue">Play as</span>
            <span class="continue-username">{username}</span>
        </button>
    {/if}
</div>

<style>
    .btn-landing {
        width: 20vmax;
        aspect-ratio: 3.5 / 1;
        border-radius: 3vmax;
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
        transform: scale(1.02) perspective(1px);
    }

    .btn-login {
        background-color: #0BBA48;
    }

    .btn-continue {
        background-color: #0BBA48;    
    }

    .div-login {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        color: #fff;
    }

    .login {
        font-size: 1.6vmax;
        font-weight: bold;

        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 0.5vw;
    }

    .continue {
        font-size: 1.6vmax;
        font-weight: bold;
    }

    .continue-username {
        font-size: 1.2vmax;
        font-weight: 300;
        overflow: hidden;
    } 

    .spotify-logo-button {
        /* https://developer.spotify.com/documentation/general/design-and-branding/#using-our-logo */
        height: 2.3vmax;
        padding-left: 1.15vmax;
        aspect-ratio: 3.37 / 1;
    }

    .requires {
        margin-top: 0.8 vmax;
        font-family: 'Circular Std';
        font-size: 1vmax;
        font-weight: 300;
        font-style: italic;
        color: #d0d0d0;
        margin-bottom: 0.5vmin;
    }

    .logout {
        color: #a0a0a0 !important;
    }

    .logout:hover {
        cursor: pointer;
    }
</style>