<script>
    import { language } from "../lib/stores";
    import { getText } from "../lib/utils";
    
    export let key;

    let text;
    $: text = getText($language, key);

</script>
{text}