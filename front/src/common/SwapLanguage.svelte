<script>
    import { language } from "../lib/stores";
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    
    let otherLanguage;
    let showInside = false;
    language.subscribe(value => {
        otherLanguage = value === "br" ? "en" : "br";
    });

    function swap() {
        $language = otherLanguage;
    }

    const show = () => {showInside = true;}
    const hide = () => {showInside = false;}


    function setFromNavigator() {
        if (/br\b/.test(navigator.language.toLowerCase())) {
            language.set("br");
        } else {
            language.set("en");
        }
    }


    onMount(() => {
        if ($language === "") {
            setFromNavigator();
        }
    })

</script>

<button 
    class="swap-language" 
    on:click|preventDefault={swap} 
    on:mouseover={show}
    on:mouseleave={hide}
    on:focus={show}
    on:focusout={hide}
>
    {#if showInside}
        <span in:fade={{ duration: 200 }}>{otherLanguage.toUpperCase()}</span>
    {:else}
        <img in:fade={{ duration: 200 }} src="/assets/language.svg" alt="{$language}">
    {/if}
</button>


<style>
    .swap-language {
        position: absolute;
        height: 4vh;
        width: 4vh;
        top: 3.5vh;
        right: 5%;
        text-decoration: none;
        font-size: 2.0vh;
        color: #fff;
        
        padding: 0.1vh 0.3vh 0.1vh 0.3vh;
        cursor: pointer;
        background-color: transparent;
        border: none;
    }
    .swap-language:hover {
        border: 0.3vh solid #fff;
        border-radius: 0.5vh;
    }

    img {
        height: 100%;
        width: 100%;
    }
</style>