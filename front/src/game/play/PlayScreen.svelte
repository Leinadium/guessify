<script>
    import AudioInterface from "./AudioInterface.svelte";
    import SearchBar from "./SearchBar.svelte";
    import Results from "./Results.svelte";

    let music_searched = [
        {
            "name": "minha musica 1",
            "artist": "meu artista 1"
        },
        {
            "name": "minha musica 2",
            "artist": "meu artista 2"
        }
    ];

    let searchedText = "pesquisado";

</script>

<div class="play-screen">
    <!-- inteface de audio-->
    <AudioInterface />

    <!-- barra de pesquisa -->
    <SearchBar bind:searchedText />

    <!-- resultados da pesquisa -->
    <Results content={music_searched} />
</div>


<style>
    .play-screen {
        display: flex;
        flex-flow: column nowrap;
        gap: 20px;
        align-items: center;
        padding-left: 100px;
        padding-right: 100px;
    }
</style>