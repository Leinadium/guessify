<script>
    import { onMount, createEventDispatcher } from "svelte";
    import { FRONT_URL, AUTH_URL, REFRESH_URL } from "./utils";
    import { refreshToken, accessToken } from "./stores";
    import { username, isAuthValid, spotifyAPIHandler, isAuthenticating } from "./stores";

    // https://javascript.plainenglish.io/how-to-create-a-popup-for-oauth-login-38dee97f5f3b
    let popup = undefined;

    let dispatch = createEventDispatcher();

    function teste(e) {
        console.log(e);
        if (e.origin != FRONT_URL) return;
        console.log(e.data);
    }

    function popupLogic(event) {
        if (event.origin != FRONT_URL) return;
        if (event.data.error) {
            popup.close();
            dispatch("error", {description: event.data.error});
        }
        if (!event.data.code) {
            popup.close();
            dispatch("error", {description: "No code received from popup"});
        }

        try {
        
        // get refresh token using code
        const codeToken = event.data.code;
        fetch(REFRESH_URL + `/${codeToken}`)
            .then((res) => res.json())
            .then((data) => {
                if (data["refresh_token"]) {
                    $refreshToken = data["refresh_token"];
                    $accessToken = data["access_token"];
                    
                    // update name
                    $spotifyAPIHandler.setAccessToken($accessToken);
                    $spotifyAPIHandler.getMe()
                        .then((data) => {
                            $username = data.display_name || data.id;
                            $isAuthValid = true;        // finally, auth is finished
                            $isAuthenticating = false;
                        })
                        .catch(() => {
                            $isAuthenticating = false;
                            dispatch("error", {description: "Error fetching username"});
                        })

                } else {
                    $isAuthenticating = false;
                    dispatch("error", {description: data["error_description"]});
                }
            })
            .catch(() => {
                $isAuthenticating = false;
                dispatch("error", {description: "Error fetching credentials via API"})
            })
            .finally(() => {
                popup.close();
            })
            
        } catch (e) {
            console.log("Error in popup logic: ");
            console.log(e); 
            $isAuthenticating = false;
            dispatch("error", {description: "Error authenticating with Spotify"});
        }
    }

    onMount(() => {
        $isAuthenticating = true;
        popup = window.open(AUTH_URL, "popup", "popup=true");
    });
</script>

<svelte:window on:message={popupLogic}></svelte:window>
