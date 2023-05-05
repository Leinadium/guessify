<script>
    export let text;
</script>

<button on:click>{text}</button>

<style>
    button {
        width: 20vh;
        height: 5vh;
        border-radius: 2vh;
        border: none;
        background: linear-gradient(0deg, rgba(48,52,186,0.8) 0%, rgba(48,52,186,1) 20%);
        
        color: #eee;
        font-weight: 500;
        font-size: 1.8vh;
        cursor: pointer;   
        transition: opacity 0.5s linear;
    }

    button:hover {
        opacity: 0.8;
    }
</style>