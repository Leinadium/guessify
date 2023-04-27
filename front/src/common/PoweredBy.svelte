<script>
    export let externUrl = "https://open.spotify.com";
    export let text = "Open in";
</script>

<a href="{externUrl}" class="extern">
    <span>{text}</span>
    <img class="open-in-logo" src="/assets/spotify-logo-green.png" alt="Spotify logo">
</a>


<style>
    .extern {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
        align-items: center;
        gap: 0.8vh;
        text-decoration: none;
        width: fit-content;
    }

    .extern > span {
        color: #1ED760;
        font-size: 1.3vh;
        font-weight: bolder;
        white-space: nowrap;
    }

    .open-in-logo {
        height: 2.5vh;
        aspect-ratio: 3.39 / 1;
    }
</style>