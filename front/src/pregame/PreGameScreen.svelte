<script>
    import { onMount } from "svelte";
    import { removeDuplicates } from "../lib/utils";
    import { spotifyAPIHandler } from "../lib/stores";
    import PlaylistInfo from "./PlaylistInfo.svelte";

    let playlists = {
        featured: [],
        user: []
    }

    let isCustom = false;

    function getFeatured() {
        $spotifyAPIHandler.getFeaturedPlaylists({limit: 50})
            .then((data) => {
                console.log(data.message);
                playlists.featured = removeDuplicates(data.playlists.items);
            })
            .catch((e) => {
                console.error("Error retrieving featured playlists", e);
            })
    }

    function getPersonal() {
        $spotifyAPIHandler.getUserPlaylists("", {limit: 50})
            .then((data) => {
                playlists.user = removeDuplicates(data.items);
            })
            .catch((e) => {
                console.error("Error retrieving personal playlists", e);
            })
    }

    onMount(() => {
        getFeatured();
        getPersonal();
    })

</script>


<div class="pregame-screen">
    {#if !isCustom}
        <div class="user-screen">
            <div class="screen-text">
                <span class="screen-title">Your playlists</span>
                <span class="screen-description">Playlists owned or followed by you</span>
            </div>

            <div class="playlist-container">
                {#each playlists.user as p (p.id) }
                    <PlaylistInfo
                        name={p.name}
                        image={p.images[0].url || null}
                        total={p.tracks.total}
                        externUrl={p.external_urls.spotify}
                    />
                {/each}
            </div>
        </div>
        
        <div class="featured-screen">
            <div class="screen-text">
                <span class="screen-title">Featured playlists</span>
                <span class="screen-description">Spotify recommendations for you</span>
            </div>

            <div class="playlist-container">
                {#each playlists.featured as p (p.id) }
                    <PlaylistInfo
                        name={p.name}
                        image={p.images[0].url || null}
                        total={p.tracks.total}
                        externUrl={p.external_urls.spotify}
                    />
                {/each}
            </div>
        </div>
    {:else}
        <div class="custom-screen">

        </div>
    {/if}

    <div class="custom-buttom">

    </div>

    <div class="start-buttom">

    </div>
</div>

