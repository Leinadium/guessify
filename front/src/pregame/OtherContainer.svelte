<script>
    import { createEventDispatcher } from "svelte";
    import { spotifyAPIHandler } from "../lib/stores";

    let url = "";
    export let selected = false;

    let type = "invalid";       // "empty", "invalid", "notfound", "valid"
    let current = {
        id: null,
        category: null,
        name: "",
        image: "",
        total: 0
    }

    let dispatch = createEventDispatcher();

    // Get the URI from the link using regex
    function getUriFromLink() {
        let uriMatch = url.match(/spotify.com\/(album|playlist)\/(\w{22})/gm);
        if (uriMatch) {
            current.category = uriMatch[0]
            current.id = uriMatch[1];

            // validating uri using spotify api
            if (current.category === 'album') {
                $spotifyAPIHandler.getAlbum(current.id).then((res) => {
                    current.content = {
                        name: res.name,
                        image: res.images[0].url,
                        total: res.tracks.total
                    }
                }).catch((e) => {
                    current.valid = false;
                    console.error("Error: ", e);
                });

            } else if (current.category === 'playlist') {
                $spotifyAPIHandler.getPlaylist(current.id, { fields: "name,images,tracks.total" }).then((res) => {
                    current.content = {
                        name: res.name,
                        image: res.images[0].url,
                        total: res.tracks.total
                    }
                }).catch((e) => {
                    current.valid = false;
                    console.error("Error: ", e);
                });
            }
        }
    }
</script>

<div class="other-container">
    <div class="other-box">
        <div class="other-box-title">
            <p>Enter the playlist/album URL</p>
        </div>
        <div class="other-box-content">
            <input
                    type="text"
                    placeholder="https://open.spotify.com/..."
                    bind:value={url}
                    on:change={getUriFromLink}
            />
        </div>
    </div>
    <div class="other-display">
        {#if type === "valid"}
            <img class="image" src={image} alt={name}>
        {:else if type === "invalid"}
        {:else if type === "notfound"}
        {:else}
        {/if}
    </div>
</div>



<style>
    .other-container {
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
        gap: 2vh;
    
        color: #fff;
        font-family: 'Circular Std';
    }

    input {
        height: 3vh;
        font-size: 1.5vw;
        font-family: 'Circular Std';
        color: #fff;
        background: rgb(24,20,20);
        border : 1px solid orange;
        border-radius: 1vh;
    }
</style>