<script>
    import { onMount, createEventDispatcher, onDestroy } from "svelte";
    import { ACCESS_URL, AUTH_URL, CB_URL, REFRESH_URL } from "./utils";
    import { refreshToken, accessToken } from "./stores";
    import { username, isAuthValid, spotifyAPIHandler } from "./stores";

    // https://javascript.plainenglish.io/how-to-create-a-popup-for-oauth-login-38dee97f5f3b
    let popup = undefined;
    let checkPopup = undefined;

    let dispatch = createEventDispatcher();

    $spotifyAPIHandler.getUserPlaylists

    function popupLogic() {
        popup = window.open(AUTH_URL, "popup", "popup=true");
        checkPopup = setInterval(() => {
            if (popup.window.location.href.includes(CB_URL)) {
                // get code token from url
                const urlParams = new URLSearchParams(popup.window.location.search);
                const maybeError = urlParams.get("error");
                if (maybeError) {
                    popup.close();
                    dispatch("error", {description: maybeError});
                } 
                else {
                    // get refresh token using code
                    const codeToken = urlParams.get("code");
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
                                    })
                                    .catch(() => {
                                        dispatch("error", {description: "Error fetching username"});
                                    })

                            } else {
                                dispatch("error", {description: data["error_description"]});
                            }
                        })
                        .catch(() => dispatch("error", {description: "Error fetching credentials via API"}))
                        .finally(() => {
                            popup.close();
                        })
                }
            }
            if (!popup || !popup.closed) return;
            clearInterval(checkPopup);
        }, 1000);
    }

    onMount(popupLogic);

    onDestroy(() => {
        if (checkPopup !== undefined) {
            clearInterval(checkPopup);
        }
    });

</script>

<div class="spotify-auth"></div>