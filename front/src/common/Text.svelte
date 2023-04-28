<script>
    import { getText } from "../lib/utils";
    import { language } from "../lib/stores";
    export let key;
    const text = getText($language, key) || "???";
</script>
{text}