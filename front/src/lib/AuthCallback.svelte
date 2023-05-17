<script>
    import { onMount } from "svelte";
    import { FRONT_URL } from "./utils";
    import Text from "../common/Text.svelte";

    let payload = {};   // "code" or "error"

    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const maybeError = urlParams.get("error");
        if (maybeError) {
            payload = {error: maybeError};
        } else {
            const codeToken = urlParams.get("code");
            payload = {code: codeToken};
        }
        
        // sending throw postMessage to parent window
        window.opener.postMessage(payload, FRONT_URL);
    })
    
</script>

<Text key="authenticated"></Text>