const PAGE_LIMIT = 50;
const ALBUM_LIMIT = 10;    // lower limit to prevent loading all tracks of an album
const MIN_TRACKS = 5;

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
        return spotifyConnection.getPlaylist(playlistId, {
            fields: "uri,name,images,tracks.items",
            limit: PAGE_LIMIT
        }).then((playlist) => {
            let tracks = playlist.tracks.items;
            let totalTracks = playlist.tracks.total;
            let offset = PAGE_LIMIT;
            let getTracks = (offset) => {
                return spotifyConnection.getPlaylistTracks(playlistId, {
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
            // skip pagination if there is only one page
            if (totalTracks > PAGE_LIMIT) 
                getTracks(offset);
            else
                resolve({ uri: playlist.uri, name: playlist.name, images: playlist.images, tracks: tracks });
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
        if (!trackIds.has(track.uri)) {
            trackIds.add(track.uri);
            uniqueTracks.push(track);
        }
    });
    return uniqueTracks;
}


/** Get information of all the playlists of an user, paginating through all the
 * pages of the api request. Uses the `spotify-web-api-js` library.
 * 
 * @param spotifyConnection - The spotify connection object
 */
export function getPlaylists(spotifyConnection) {
    /* generated via copilot :D */
    return new Promise((resolve, reject) => {
        spotifyConnection.getUserPlaylists({
            limit: PAGE_LIMIT
        }).then((data) => {
            let playlists = data.items;
            let totalPlaylists = data.total;
            let offset = PAGE_LIMIT;
            let getPlaylists = (offset) => {
                spotifyConnection.getUserPlaylists({
                    offset: offset,
                    limit: PAGE_LIMIT
                }).then((data) => {
                    playlists = playlists.concat(data.items);
                    if (playlists.length < totalPlaylists) {
                        getPlaylists(offset + PAGE_LIMIT);
                    } else {
                        resolve(playlists);
                    }
                })
                .catch((err) => {
                    reject(err);
                });
            };
            // skip paginating if there is only one page
            if (totalPlaylists > PAGE_LIMIT)
                getPlaylists(offset);
            else
                resolve(playlists);
        })
        .catch((err) => {
            reject(err);
        });
    });
}

/**Get information of all liked albums of an user, pagination through all the
 * pages of the api request. Uses the `spotify-web-api-js` library.
 * @param spotifyConnection - The spotify connection object
*/
export function getAlbums(spotifyConnection) {
    return new Promise((resolve, reject) => {
        // note: the following command is wrong according to Typescript 
        // (i had to set usernameId as undefined), but this is a known
        // problem in this library: 
        // https://github.com/JMPerez/spotify-web-api-js/issues/181
        // luckily, i am not using typescript :D
        spotifyConnection.getMySavedAlbums({
            limit: ALBUM_LIMIT
        }).then((data) => {
            let albums = data.items;
            let totalAlbums = data.total;
            let offset = ALBUM_LIMIT;
            let getAlbums = (offset) => {
                spotifyConnection.getMySavedAlbums({
                    offset: offset,
                    limit: ALBUM_LIMIT
                }).then((data) => {
                    albums = albums.concat(data.items);
                    if (albums.length < totalAlbums) {
                        getAlbums(offset + ALBUM_LIMIT);
                    } else {
                        resolve(albums);
                    }
                })
                .catch((err) => {
                    reject(err);
                });
            };
            // skip pagination if there is only one page
            if (totalAlbums > ALBUM_LIMIT)
                getAlbums(offset);
            else
                resolve(albums);
        })
        .catch((err) => {
            reject(err);
        });
    });
}


/**Get the last image of a track (smallest possible)
 * If there is no image available, return null
 */
export function getImage(images) {
    const l = images.length; 
    if (l > 0) {
        return images[l - 1].url;
    }
    return null;
}

function createErrorMessage(uriType) {
    return {
        responseText: JSON.stringify({
            error: 
                {message: `${uriType} must have at least ${MIN_TRACKS} unique tracks`
            }
        })
    }; 
}


/**Validates the playlist/album, removing duplicates tracks,
 * checking if there are more than 5 unique tracks, and returning
 * the playlist/album object
 */
export async function validadeAndReturn(spotifyApi, uri) {
    /* of course, auto generated via copilot :D */
    const uriSplit = uri.split(":");
    const uriType = uriSplit[1];
    const uriId = uriSplit[2];

    console.log(uri);

    // if you thought the previous code was bad, wait until you see this
    if (uriType === "playlist") {
        return getFullPlaylistInfo(spotifyApi, uriId)
            .then((playlist) => {
                // removing duplicates and checking the number of tracks
                return new Promise((resolve, reject) => {
                    playlist.tracks = removeDuplicates(playlist.tracks.map(v => v.track));
                    if (playlist.tracks.length < 5) {
                        reject(createErrorMessage("Playlist"));
                    }
                    resolve(playlist);
                });
            });
    }
    else if (uriType === "album") {
        // paginating is required, unfortunately
        return new Promise((resolve, reject) => {
            return spotifyApi.getAlbumTracks(uriId, {
                limit: PAGE_LIMIT
            }).then((album) => {
                let tracks = album.items;
                let totalTracks = album.total;
                let offset = PAGE_LIMIT;
                let getTracks = (offset) => {
                    return spotifyApi.getAlbumTracks(uriId, {
                        offset: offset,
                        limit: PAGE_LIMIT
                    }).then((album) => {
                        tracks = tracks.concat(album.items);
                        if (tracks.length < totalTracks) {
                            getTracks(offset + PAGE_LIMIT);
                        } else {
                            if (tracks.length < MIN_TRACKS) {
                                reject(createErrorMessage("Album"));
                            }
                            resolve({
                                uri: uri,
                                name: album.name,
                                images: album.images,
                                tracks: tracks
                            });
                        }
                    })
                    .catch((err) => {
                        reject(err);
                    });
                };
                // skip pagination if there is only one page
                if (totalTracks > PAGE_LIMIT)
                    getTracks(offset);
                else {
                    if (tracks.length < MIN_TRACKS) {
                        reject(createErrorMessage("Album"));
                    }
                    resolve({
                        uri: uri,
                        name: album.name,
                        images: album.images,
                        tracks: tracks
                    });
                }
            })
            .catch((err) => {
                reject(err);
            });
        });
    }
    else {
        return new Promise((_resolve, reject) => {
            reject("Invalid URI");
        });
    }
}