<script>
    import { language } from "../../../lib/stores";
    import { MAX_SCORE, FRONT_URL, uriToCompact } from "../../../lib/utils";
    import CopyButton from "./CopyButton.svelte";
    import TwitterButton from "./TwitterButton.svelte";
    import WhatsappButton from "./WhatsappButton.svelte";

    export let score = 0;
    export let name = "a playlist";
    export let uri = "";

    let url = FRONT_URL + (uri ? "?play=" + uriToCompact(uri) : "");
    let text;
    if ($language === "br") {
        text = `Eu fiz ${score.toFixed(0)}/${MAX_SCORE} pontos em "${name}" no Guessify! Jogue em ${url}`; 
    } else {
        text = `I got ${score.toFixed(0)}/${MAX_SCORE} points at "${name}" on Guessify! Play at ${url}`;
    }
</script>


<div class="share-buttons">
    <TwitterButton {text}/>
    <WhatsappButton {text}/>
    <CopyButton {text}/>
</div>

<style>
    .share-buttons {
        height: 5vh;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        gap: 1vw;
    }
</style>

