<script>
    import { onMount, createEventDispatcher } from "svelte";
    import { getPlaylists, getAlbums, validadeAndReturn } from "../lib/utils";
    import { spotifyAPIHandler } from "../lib/stores";
    import { fade } from "svelte/transition";
    import ContentContainer from "./ContentContainer.svelte";
    import OtherContainer from "./OtherContainer.svelte";
    import PreGameButton from "./PreGameButton.svelte";
    import Error from "../common/Error.svelte";

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
        then: "",
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
                    then: "goBack"
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
                    then: "goBack"

                }
                
            })
    }

    function handleSelectUpdate(e) {
        console.log(e);
        selectedInfo = {
            uri: e.detail.uri,
            name: e.detail.name,
        }
        selectedContext = e.detail.type;
        console.log(selectedInfo);
        console.log(selectedContext);
    }

    function validateAndSubmit() {
        // you can only submit if there is an uri loaded and valid
        // so, validate the uri content (album/playlist) and submit
        validadeAndReturn($spotifyAPIHandler, selectedInfo.uri)
            .then(validated => dispatch("submit", {
                content: validated,
            }))
            .catch(err => {
                console.error(err);
                pregameError = {
                    "title": "Invalid Playlist/Album",
                    "quickDescription": "The selected playlist/album is invalid. Please select another one.",
                    "fullDescription": JSON.parse(err.responseText).error.message,
                    show: true,
                    then: "goBack"
                }
            });
    }

    function errorOnClose() {
        if (pregameError.then === "goBack") {
            pregameError.show = false;
            selectedInfo.uri = "";

        } else if (pregameError.then === "reset") {
            dispatch("reset");
        }
    }


    onMount(() => {
        if (loadingReady === 0) loadContent();
        pregameError.show = false;
    })

</script>

<Error {...pregameError} on:close={errorOnClose} />

<div class="pregame-screen" transition:fade on:outroend>

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
        on:click={validateAndSubmit}
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
