<script>
    import { createEventDispatcher } from "svelte";
    import { spotifyAPIHandler } from "../lib/stores";
    import ContentBox from "../common/ContentBox.svelte";

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
                $spotifyAPIHandler.getPlaylist(current.id, { fields: "uri,name,images,tracks.total,external_urls" }).then((res) => {
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
        <span class="new-error">Invalid URL</span>
    {:else if type === "notfound"}
        <span class="new-error">Could not find Playlist or Album</span>
    {:else if type === "empty"}
        <div class="new-error"></div>
    {/if}
</div>



<style>
    .other-container {
        width: 80vmin;
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
        gap: 0.5vmin;
    }

    input {
        height: 3vh;
        width: 80%;
        font-size: 1.8vh;
        color: #BBB;
        background: rgb(24,20,20);
        border: 0;
        border-radius: 1vmin;
        padding: 0 1vmin 0 1vmin;
        white-space: nowrap;
        text-overflow: hidden;
    }

    .container-background {
        margin-top: 1vmin;
        width: 82%;
        height: fit-content;
        background-color: black;
        border-radius: 10px;
    }

    .new-error {
        /* copying spacing from container (there should be a better way to do this... anyway) */
        height: 6vmin;
        margin-bottom: 3vmin;

        color: #BBB;
        font-size: 1.5vmin;
        font-weight: bold;
        font-style: italic;
        text-align: center;
    }

</style>