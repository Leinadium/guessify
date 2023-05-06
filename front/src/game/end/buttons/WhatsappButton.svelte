<script>
    export let text;

    const payload = {
        text: text,
    }

    const url = "https://api.whatsapp.com/send?" + (new URLSearchParams(payload)).toString();

</script>

<a class="whatsapp" href={url} target="_blank" rel="noopener noreferrer">
    <img src="/assets/whatsapp-icon.svg" alt="WhatsApp">
</a>

<style>
    .whatsapp {
        aspect-ratio: 1 / 1;
        height: 100%;
        color: #fff;
        font-size: 2vh;

        display: flex;
        justify-content: center;
        align-items: center;
        background: #25d366;
        border-radius: 50%;
    }

    img {
        aspect-ratio: 1 / 1;
        height: 60%;
    }
</style>