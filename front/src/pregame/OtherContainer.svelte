<script>
    import { createEventDispatcher } from "svelte";
    import { spotifyAPIHandler } from "../lib/stores";
    import ContentBox from "./ContentBox.svelte";

    let url = "";
    export let isSelected = false;

    let type = "invalid";       // "empty", "invalid", "notfound", "valid"
    let current = {
        id: null,
        category: null,
        content: {
            uri: "",
            name: "",
            image: "",
            total: 0,
            externUrl: ""
        }
    }

    let dispatch = createEventDispatcher();

    function update() {
        isSelected = true;
        dispatch("select", {
            uri: current.content.uri, 
            type: "new",
            name: current.content.name
        })

    }  

    // Get the URI from the link using regex
    $: url, getUriFromLink();
    function getUriFromLink() {
        if (url === "") {
            isSelected = false;
            type = "empty";
            return;
        }
        let uriMatch = url.match(/spotify\.com\/(album|playlist)\/(\w{22})/m);
        if (uriMatch) {
            console.log(uriMatch);
            current.category = uriMatch[1]
            current.id = uriMatch[2];

            // validating uri using spotify api
            if (current.category === 'album') {
                $spotifyAPIHandler.getAlbum(current.id).then((res) => {
                    current.content = {
                        uri: res.uri,
                        name: res.name,
                        image: res.images[0].url,
                        total: res.tracks.total,
                        externUrl: res.external_urls.spotify
                    }
                    type = "valid";
                })
                .then(update)
                .catch(() => {
                    isSelected = false;
                    type = "notfound";
                    // TODO: maybe parse other errors
                });

            } else if (current.category === 'playlist') {
                $spotifyAPIHandler.getPlaylist(current.id, { fields: "name,images,tracks.total" }).then((res) => {
                    current.content = {
                        uri: res.uri,
                        name: res.name,
                        image: res.images[0].url,
                        total: res.tracks.total,
                        externUrl: res.external_urls.spotify
                    };
                    type = "valid";
                })
                .then(update)
                .catch(() => {
                    isSelected = false;
                    type = "notfound";
                    // TODO: maybe parse other errors
                });
            }
        } else {
            isSelected = false;
            type = "invalid";
        }
    }
</script>

<div class="other-container">    
    <input
        type="text"
        placeholder='Click on "Share - Copy Link" and paste here'
        bind:value={url}
    />
    {#if type === "valid"}
    
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="container-background" on:click={update}>
        <ContentBox 
            {...current.content}
            isSelected={isSelected}
            expand={true}
        />
    </div>
    {:else if type === "invalid"}
        <spam class="new-error">Invalid URL</spam>
    {:else if type === "notfound"}
        <spam class="new-error">Could not find Playlist or Album</spam>
    {:else if type === "empty"}
        <div class="new-error"></div>
    {/if}
</div>



<style>
    .other-container {
        width: min(60vw, 80vh);
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
        gap: 0.5vh;
    }

    input {
        height: 2vh;
        width: 80%;
        font-size: min(2vw, 1.5vh);
        color: #BBB;
        background: rgb(24,20,20);
        border: 0;
        border-radius: 1vh;
        padding: 0 1vh 0 1vh;
        white-space: nowrap;
        text-overflow: hidden;
    }

    .container-background {
        margin-top: 1vh;
        width: 80%;
        height: fit-content;
        background-color: black;
        border-radius: 10px;
    }

    .new-error {
        /* copying spacing from container (there should be a better way to do this... anyway) */
        height: min(6vh, 8vw);
        margin-bottom: 3vh;

        color: #BBB;
        font-size: 1.5vh;
        font-weight: bold;
        font-style: italic;
        text-align: center;
    }

</style>