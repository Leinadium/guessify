<script>
    import SomeButton from "./SomeButton.svelte";

    export let score = -1;
    export let name = "a playlist";

    let text = "I got " + score.toFixed(0) + " on " + name + " on Guessify! Play at";
    if (score === -1) {
        text = "I got a perfect score on " + name + " on Guessify!";
    }

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
        if (navigator.canShare(payload)) {
            navigator.share(payload)
        } else {
            navigator.clipboard.writeText(text)
            copied = true
        }
    }



</script>

{#if copied}
    <SomeButton text="Copied!" green={true}/>
{:else}
    <SomeButton text="Share" green={true} on:click={share}/>
{/if}
