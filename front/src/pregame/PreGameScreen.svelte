<script>
    import { onMount } from "svelte";
    import { removeDuplicates, getPlaylists, getAlbums } from "../lib/utils";
    import { spotifyAPIHandler } from "../lib/stores";
    import ContentBox from "./ContentBox.svelte";
    import ContentContainer from "./ContentContainer.svelte";

    let playlistsList = [];
    let albumsList = [];
    let loadingReady = 0;   // 2 when ready

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
            .catch(err => { console.log("Error collecting liked playlists: ", err); });

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
            .catch(err => { console.log("Error collecting liked albums: ", err); })
    }


    onMount(() => {
        if (loadingReady === 0) 
            loadContent();
    })

</script>


<div class="pregame-screen">
    
    <div class="selection-box">
        <div class="pregame-left"> 
            <ContentContainer 
                content={contentList}
                loaded={loadingReady === 2}
            />
        </div>
    
        <div class="pregame-right">
            s
        </div>
    </div>
    
    
</div>


<style>
    .pregame-screen {
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: flex-start;
        padding-top: 3vh;
    }
</style>
