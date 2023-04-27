const API_URL = "http://10.201.254.139:5000";
const FRONT_URL = "http://10.201.254.139:5173";

export const AUTH_URL = `${API_URL}/auth`;
export const CB_URL = FRONT_URL;
export const REFRESH_URL = `${API_URL}/get_refresh`;
export const ACCESS_URL = `${API_URL}/get_access`;
export const REFRESH_KEY = "refresh";
export const VOLUME_KEY = "volume";
export const MAX_ROUNDS = 5;
export const MAX_SCORE = 100;

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
