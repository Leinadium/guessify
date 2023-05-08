import texts from "./texts.json";

const API_URL = "http://localhost:5000";
export const FRONT_URL = "http://localhost:5173";

export const AUTH_URL = `${API_URL}/auth`;
export const CB_URL = FRONT_URL;
export const REFRESH_URL = `${API_URL}/get_refresh`;
export const ACCESS_URL = `${API_URL}/get_access`;
export const REFRESH_KEY = "refresh";
export const VOLUME_KEY = "volume";
export const LANG_KEY = "lang";
export const MAX_ROUNDS = 5;
export const MAX_SCORE = 100;

const GRACE_PERIOD = 7000;

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

export function getText(la, ke) {
    return texts[la][ke]
}


/**Removes the SDK from the web app,
 * to prevent multiple SDK loaded
 */
export function destroySdk() {
    let iframes = document.getElementsByTagName("iframe");
    if (iframes.length > 0) {
        iframes[0].parentNode.removeChild(iframes[0]);
    }
}

/**Calculate the current max score based on length of music and current ms */
export function currentScore(currentMs, totalMs, maxRounds) {
    const MAX_SCORE_PER_ROUND = MAX_SCORE / maxRounds;
    
    // grace period of 7s
    if (currentMs < GRACE_PERIOD) { return MAX_SCORE_PER_ROUND; }
    // linear gradient from 7s to half of the song
    const score = MAX_SCORE_PER_ROUND * (1 - ((currentMs - GRACE_PERIOD) / ((totalMs - GRACE_PERIOD) / 3)));

    return score > 0 ? Math.floor(score) : 0;
}

/** type:id --> (t)(id) */
export function uriToCompact(uri) {
    const l = uri.split(":");
    return l[1][0] + l[2];
}

/** (t)(id) --> spotify.com/type/id */
export function compactToUrl(t, id) {
    const tt = t === "a" ? "album" : "playlist";
    return `https://open.spotify.com/${tt}/${id}`;
}