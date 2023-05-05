<script>
    export let text;

    const payload = {
        send: text,
    }

    const url = "https://wa.me/" + (new URLSearchParams(payload)).toString();

</script>

<a class="whatsapp" href={url}>
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