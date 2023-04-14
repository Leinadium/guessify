<script>
    export let externUrl = "https://open.spotify.com";
    export let text = "Open in";
</script>

<a href="{externUrl}" class="extern">
    <spam>{text}</spam>
    <img class="open-in-logo" src="/assets/spotify-logo-green.png" alt="Spotify logo">
</a>


<style>
    .extern {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
        align-items: flex-end;
        width: fit-content;
        gap: 0.3vw;
        text-decoration: none;
        width: fit-content;
    }

    .extern > spam {
        color: #1ED760;
        font-size: 1.2vmin;
        font-weight: 500;

        white-space: nowrap;
    }

    .open-in-logo {
        height: 1.5vmin;
        aspect-ratio: 3.39 / 1;
    }
</style>