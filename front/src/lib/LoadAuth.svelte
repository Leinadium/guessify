<script>
    /*
        This component is called on page load to validate any refresh or access token stored
        on the browser.

        If accessToken and refreshToken:
            Attempt to get username
            If success:
                Store username
            Else:
                Invalidate accessToken
        
        If not accessToken and refreshToken:
            Attempt to get new accessToken
            If success:
                Store accessToken
            Else:
                Invalidate refreshToken
        
        If accessToken and not username:
            Attempt to get username     // should always work...
            If success:
                Store username
            Else:
                Invalidate refreshToken     // only if getMe is invalid, maybe scope options has been changed?
        
        isAuthValid = username === nulll
    */

    import { refreshToken, accessToken, username, isAuthValid } from "./stores";
    import { spotifyAPIHandler } from "./stores";
    import { ACCESS_URL } from "./utils";
    import { onMount } from "svelte";

    async function updateUsername(token) {
        $spotifyAPIHandler.setAccessToken(token);
        const res = await $spotifyAPIHandler.getMe().then((data) => {
            $username = data.display_name || data.id;
            return true;
        }).catch(() => {
            return false;
        })
        return res;
    }

    async function load() {
        if ($accessToken && $refreshToken) {
            const s = await updateUsername($accessToken);
            if (!s) { 
                $accessToken = null; 
                $username = null;
            }
        }

        if (!$accessToken && $refreshToken) {
            await fetch(ACCESS_URL + `/${$refreshToken}`).then((res) => res.json())
                .then((data) => {
                    if (data["access_token"]) {
                        $accessToken = data["access_token"];
                        $refreshToken = data["refresh_token"] || $refreshToken;
                    } else {
                        $refreshToken = null;
                    }
                }).catch(() => {
                    $refreshToken = null;
                })    
        }

        if ($accessToken && !$username) {
            const s = await updateUsername($accessToken);
            if (!s) { 
                $refreshToken = null;
                $username = null; 
            }
        }

        $isAuthValid = !! $username;    
    }
    
    onMount(load)

</script>

<div class="load-auth"></div>