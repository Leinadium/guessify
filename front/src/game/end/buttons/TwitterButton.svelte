<script>
    export let text;

    const payload = {
        original_referer: window.location.href,
        text: text,
        // url: window.location.href,      // TODO
    }
    const url = "https://twitter.com/intent/tweet?" + (new URLSearchParams(payload)).toString();

</script>

<a class='twitter' href={url} target="_blank" rel="noopener noreferrer">
    <img src="/assets/twitter-icon.svg" alt="Tweet">
</a>

<style>
    .twitter {
        aspect-ratio: 1 / 1;
        height: 5vh;
        color: #fff;
        font-size: 2vh;
        margin: 0;
        padding: 0;
    }

    img {
        aspect-ratio: 1 / 1;
        height: 100%;
    }
</style>