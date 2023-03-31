<script>
    import { onMount, createEventDispatcher } from "svelte";
    import { getPlaylists, getAlbums } from "../lib/utils";
    import { spotifyAPIHandler } from "../lib/stores";
    import ContentContainer from "./ContentContainer.svelte";
    import OtherContainer from "./OtherContainer.svelte";
    import PreGameButton from "./PreGameButton.svelte";
    import Error from "../commom/Error.svelte";

    let playlistsList = [];
    let albumsList = [];
    let loadingReady = 0;   // 2 when ready
    let selectedInfo = {
        uri: "",
        name: "",
    }
    let selectedContext = "select";     // select | new

    let pregameError = {
        title: "",
        quickDescription: "",
        fullDescription: "",
        show: false,
    }

    let dispatch = createEventDispatcher();

    // adding all the playlists and albums into one list
    let contentList = [];
    $: {
        contentList = [];
        contentList.push(...playlistsList);
        contentList.push(...albumsList);
        console.log(contentList);
    }

    async function loadContent() {
        await getPlaylists($spotifyAPIHandler)
            .then(playlists => {playlistsList = playlists.filter(p => p.tracks.total > 0)})
            .then(() => { 
                console.log("Playlists collected: ", playlistsList.length);
                loadingReady++; 
            })
            .catch(err => {
                console.log("Error collecting liked playlists: ", err); 
                pregameError = {
                    "title": "Error collecting liked playlists",
                    "quickDescription": "Spotify couldn't load your liked playlists. Please refresh the page or try again later.",
                    "fullDescription": JSON.parse(err.responseText).error.message,
                    show: true,
                }
                
            });

        await getAlbums($spotifyAPIHandler)
            .then(albums => {
                albumsList = albums.map(a => {
                    return {
                        uri: a.album.uri,
                        id: a.album.id,
                        name: a.album.name,
                        images: a.album.images,
                        tracks: {total: a.album.tracks.total},
                        external_urls: {spotify: a.album.external_urls}
                    }
                });
            })
            .then(() => { 
                console.log("Albums collected: ", albumsList.length);
                loadingReady++; 
            })
            .catch(err => {
                console.log("Error collecting liked albums: ", err); 
                pregameError = {
                    "title": "Error collecting liked albums",
                    "quickDescription": "Spotify couldn't load your liked albums. Please refresh the page or try again later.",
                    "fullDescription": JSON.parse(err.responseText).error.message,
                    show: true,
                }
                
            })
    }

    function handleSelectUpdate(e) {
        selectedContext = e.detail.type;
        selectedInfo.uri = e.detail.uri;
        selectedInfo.name = e.detail.name;
    }


    onMount(() => {
        if (loadingReady === 0) loadContent();
        pregameError.show = false;
    })

</script>

<Error {...pregameError} on:close={() => dispatch("reset")} />

<div class="pregame-screen">

    <div class="pregame-select">
        <spam class="title">Choose from your library</spam>
        <ContentContainer 
            content={contentList}
            loaded={loadingReady === 2}
            isSelected={selectedContext === "select"}
            on:select={handleSelectUpdate}
        />
    </div>

    <div class="pregame-new">
        <spam class="title">or load from an URL</spam>
        <OtherContainer
            isSelected={selectedContext === "new"}
            on:select={handleSelectUpdate}
        />
    </div>

    <PreGameButton
        valid={selectedInfo.uri !== ""}
        name={selectedInfo.name}
    />

</div>


<style>
    .pregame-screen {
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
        padding-top: 3vh;
        gap: 1.5vh;
    }

    .pregame-select, .pregame-new {
        width: 100%;
        display: flex;
        flex-flow: column wrap;
        justify-content: flex-start;
        align-items: center;
        gap: 0.3vh;

        color: #fff;
        font-family: 'Circular Std';
    }

    .pregame-new {
        margin-bottom: 4vh;
    }

    .title {
        font-size: 2vh;
        font-weight: 500;
        color: #EEEEEE;
    }
</style>
