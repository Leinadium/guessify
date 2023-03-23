const PAGE_LIMIT = 50;

const BASE_URL = "http://localhost:5000"

export const AUTH_URL = `${BASE_URL}/auth`;
export const CB_URL = `http://localhost:5173`;         // TODO: change to real api callback
export const REFRESH_URL = `${BASE_URL}/get_refresh`;
export const ACCESS_URL = `${BASE_URL}/get_access`;
export const REFRESH_KEY = "refresh";

/** Get all the tracks recursively of a spotify playlist, paginating through all
 *  the pages of the api request. Uses the `spotify-web-api-js` library.
 * 
 *  Also get some basic information about the playlist, like the name and cover
 * 
 * @param spotifyConn - The spotify connection object
 * @param playlistId - The id of the playlist
 */
export function getFullPlaylistInfo(spotifyConnection, playlistId) {
    /* generated via copilot :D */
    return new Promise((resolve, reject) => {
        spotifyConnection.getPlaylist(playlistId, {
            fields: "uri,name,images,tracks.items",
            limit: PAGE_LIMIT
        }).then((playlist) => {
            let tracks = playlist.tracks.items;
            let totalTracks = playlist.tracks.total;
            let offset = PAGE_LIMIT;
            let getTracks = (offset) => {
                spotifyConnection.getPlaylistTracks(playlistId, {
                    offset: offset,
                    fields: "items.track(uri,id,name,artists.name,duration_ms,album(images,name))"
                }).then((data) => {
                    tracks = tracks.concat(data.items);
                    if (tracks.length < totalTracks) {
                        getTracks(offset + PAGE_LIMIT);
                    } else {
                        resolve({
                            uri: playlist.uri,
                            name: playlist.name,
                            images: playlist.images,
                            tracks: tracks
                        });
                    }
                })
                .catch((err) => {
                    reject(err);
                });
            };
            getTracks(offset);
        })
        .catch((err) => {
            reject(err);
        });
    });
}

/** Removes duplicate tracks out of a list of tracks */
export function removeDuplicates(tracks) {
    let trackIds = new Set();
    let uniqueTracks = [];
    tracks.forEach((track) => {
        if (!trackIds.has(track.id)) {
            trackIds.add(track.id);
            uniqueTracks.push(track);
        }
    });
    return uniqueTracks;
}


