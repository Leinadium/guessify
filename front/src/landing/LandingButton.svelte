<script>
    import { fade } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
    import Text from "../common/Text.svelte";

    export let type = "loading";    // loading, valid, invalid
    export let username = ""; 

    let dispatch = createEventDispatcher();

    function startAuth() {
        console.log("triggered auth");
        dispatch("auth");
    }

    function resetAuth() {
        dispatch("reset");
    }

</script>

<div class="div-login">
    {#if type === "loading"}
        <img class="loading-icon" src="/assets/spin.svg" alt="">
    {:else if type === "invalid"}
        <span class="requires">
            <Text key="landing-requires"></Text>
        </span>
        <button class="btn-landing btn-login" in:fade on:click={startAuth}>
            <span class="login">
                <Text key="landing-login" />
                <img class="spotify-logo-button" src="/assets/spotify-logo-white.png" alt="Spotify">
            </span>
        </button>
    {:else}
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a href="#" class="requires logout" on:click|preventDefault={resetAuth}>
            <Text key="landing-not" /> {username}? <Text key="landing-logout" />
        </a>
        <button class="btn-landing btn-continue" in:fade on:click="{() => {dispatch('ready')}}">
            <span class="continue"><Text key="landing-continue" /></span>
            <span class="continue-username">{username}</span>
        </button>
    {/if}
</div>

<style>
    .loading-icon {
        height: 10vh;
        aspect-ratio: 1 / 1;
    }
    .btn-landing {
        width: 30vh;
        height: 10vh;
        aspect-ratio: 3 / 1;
        border-radius: 3vh;
        border: 0px;
        box-sizing: border-box;
        cursor: pointer;
        color: #fff;

        box-shadow: 0px 4px 16px rgba(17,17,26,0.1), 0px 8px 24px rgba(17,17,26,0.1), 0px 16px 56px rgba(17,17,26,0.1);

        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;

        transition-duration: 0.33s;
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
        height: fit-content;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        gap: 0.5vh;
        color: #fff;
    }

    .login {
        font-size: 2.5vh;
        font-weight: bold;

        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 0.5vw;
    }

    .continue {
        font-size: 3vh;
        font-weight: bold;
    }

    .continue-username {
        font-size: 1.8vh;
        font-weight: 300;
        overflow: hidden;
    } 

    .spotify-logo-button {
        /* https://developer.spotify.com/documentation/general/design-and-branding/#using-our-logo */
        height: 3vh;
        padding-left: 1.15vmax;
        aspect-ratio: 3.37 / 1;
    }

    .requires {
        display: inline;
        font-size: 2vh;
        font-weight: 300;
        font-style: italic;
        color: #d0d0d0;
    }

    .logout {
        color: #a0a0a0 !important;
    }

    .logout:hover {
        cursor: pointer;
    }
</style>