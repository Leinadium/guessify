<script>
    import { getText } from "../../../lib/utils";
    import { language } from "../../../lib/stores";

    export let text;

    let copied = false
    $: if (copied) {
        setTimeout(() => {
            copied = false
        }, 2000)
    }

    /** try to share using navigator.share, else copyt o clipboard*/
    function share() {
        let payload = { 
            title: "Guessify",
            text: text,
            url: window.location.href
        };
        try {
            navigator.share(payload)
        } catch {
            navigator.clipboard.writeText(text)
            copied = true
        }
    }

    const copiedText = getText($language, "game-copied");

</script>

<a href="/#" class="copy" on:click|preventDefault={share}>
    {#if !copied}
        <img src="/assets/copy.svg" alt="Copy" />
    {:else}
        <img src="/assets/copied.svg" alt="Copied"/>
    {/if}
</a>

<style>
    a {
        aspect-ratio: 1 / 1;
        height: 5vh;
        color: #fff;
        font-size: 2vh;
    }
    img {
        aspect-ratio: 1 / 1;
        height: 100%;
    }
</style>
