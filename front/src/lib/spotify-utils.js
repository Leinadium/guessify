import { MAX_ROUNDS } from "./utils";

const UPPER_LIMIT = 50;
const LOWER_LIMIT = 10;

const FIELD_TRACK = "total,items.track(uri,id,name,artists.name,duration_ms,album(images,name),external_urls.spotify)";
const FIELD_COMPLETE = `name,images,tracks(${FIELD_TRACK}),external_urls.spotify`; 

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

/**
 * Get all the tracks recusrively from a spotify playlist or album, paginating
 * through all the pages of api request. Uses the `spotify-web-api-js` library.
 * 
 * Also gets some basic information about the playlist: 
 * name, cover, total number of tracks, and external url.
 * 
 * @param conn - the spotify connection object
 * @param uri - the uri of the playlist or album 
 */
export async function getAllTracks(conn, uriId, uriType) {
    console.log("Getting all tracks from", uriId);
    let firstRequest, loopRequest;

    // Checks if the uri is a playlist or an album
    if (uriType === "playlist") {
        firstRequest = (uriId) => conn.getPlaylist(uriId, {fields: FIELD_COMPLETE, limit: UPPER_LIMIT}); 
        loopRequest = (uriId, offset) => conn.getPlaylistTracks(uriId, {
            offset: offset, limit: UPPER_LIMIT, fields: FIELD_TRACK
        });
    } else if (uriType === "album") {
        firstRequest = (uriId) => conn.getAlbum(uriId, {limit: UPPER_LIMIT});
        loopRequest = (uriId, offset) => conn.getAlbumTracks(uriId, {
            offset: offset, limit: UPPER_LIMIT
        });
    } else {
        throw new Error("Invalid type (not playlist or album)");
    }

    // generic content request and pagination
    let content = await firstRequest(uriId);
    let tracks = content.tracks.items;
    let total = content.tracks.total;
    
    // paginating
    while (tracks.length < total) {
        console.log(`Getting more tracks from ${uriType}: ${tracks.length} / ${total}`);
        let nextTracks = await loopRequest(uriId, tracks.length);
        tracks = tracks.concat(nextTracks.items);
    }

    return {
        uri: content.uri,
        name: content.name,
        images: content.images,
        tracks: tracks,
        link: content.external_urls.spotify
    }
}

/**
 * Get information of all playlists/albums from a spotify user, paginating through all
 * the pages of the api request
 */
async function getContents(request) {
    console.log("Getting all playlists");

    let contents = await request({limit: LOWER_LIMIT});
    let total = contents.total;

    while (contents.items.length < total) {
        console.log(`Getting more playlists: ${contents.items.length} / ${total}`);
        let nextPlaylists = await request({offset: contents.items.length});
        contents.items = contents.items.concat(nextPlaylists.items);
    }

    return contents.items;
}

export async function getAlbums(conn) {
    try { return getContents(conn.getMySavedAlbums); } 
    catch { throw new Error("Error getting user albums"); }
}

export async function getPlaylists(conn) {
    try { return getContents(conn.getUserPlaylists); } 
    catch { throw new Error("Error getting user playlists"); }
}


/**
 * Validate the playlist/album, removing duplicate tracks
 * and checking if there are more than 5 unique tracks
 */
export async function validateAndReturn(conn, uri) {
    const uriSplit = uri.split(":");
    const uriType = uriSplit[1];
    const uriId = uriSplit[2];

    console.log("Validating ", uri, " of type ", uriType);
    let content = await getAllTracks(conn, uriId, uriType);

    // removing duplicates
    content.tracks = removeDuplicates(content.tracks.map(v => v.track));
    if (content.tracks.length < 5) {
        return {responseText: JSON.stringify({error: {
            message: `${uriType} must have at least ${MAX_ROUNDS} unique tracks`
        }})};
    }

    return content;
}