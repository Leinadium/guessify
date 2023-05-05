<script>
    import { onMount } from "svelte";
    import ContentBox from "../../common/ContentBox.svelte";
    import StartButton from "./StartButton.svelte";
    import { getImage } from "../../lib/utils";
    import Text from "../../common/Text.svelte";
    import { language } from "../../lib/stores";

    export let loading = {
        text: "",
        progress: 0.3,
        done: false
    };
    export let content = {};

    const tips = [
        "Press ENTER to submit the selected track",
        "Click on a track to select, click again to submit",
        "You can search using the name of the track, album or artist(s)",
        "Use the arrow keys to navigate between tracks",
        "You gain more points by guessing the track faster",
        "A track can be played only once per game",
        "You can skip a track, but you won't gain any points",
        "Don't open the Spotify app while playing, this is cheating!",
    ];

    const dicas = [
        "Pressione ENTER para submeter a música selecionada",
        "Clique numa música para selecionar, clique novamente para submeter",
        "Pode pesquisar usando o nome da música, álbum ou artista(s)",
        "Utilize as setas para navegar entre as músicas",   
        "Ganhe mais pontos ao adivinhar a música mais rápido",
        "Uma música só pode ser tocada uma vez por jogo",
        "Pode pular uma música, mas não ganhará pontos na rodada",
        "Não abra o Spotify durante o jogo, isso é roubar!"     
    ]

    let currentTip = "";
    let currentIndex = 0;

    $: escolha = $language == "br" ? dicas : tips;
    $: currentTip = escolha[currentIndex];

    onMount(() => {
        // choose a random tip
        currentIndex = Math.floor(Math.random() * escolha.length);
    })


</script>

<div class="start-screen">
    <div class="wrapper-box">
        <span class="content-header"><Text key="start-selected" /></span>
        <ContentBox 
            name={content.name}
            image={getImage(content.images)}
            total={content.tracks.length}
            externUrl={content.link}
            isSelected={false}
            isUnique={true}
        />
    </div>

    {#if currentTip }
        <div class="tip">
            <span class="tip-title"><Text key="start-tip" /></span>
            <span class="tip-text">{currentTip}</span>
        </div>
    {/if}

    <StartButton 
        loading={loading}
        on:start
    />
   
</div>


<style>
    .start-screen {
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;    
        justify-content: flex-start;
        gap: 10vmin;
        padding-top: 5vmin;
    }

    .wrapper-box {
        width: 80vmin;
        display: flex;
        flex-flow: column nowrap;
        gap: 0.3vmin;
        align-items: center;
    }

    .content-header {
        color: #ffffff;
        font-size: 2.2vh;
    }

    .tip {
        color: #CCC;
        width: 80vmin;
        display: flex;
        flex-flow: column nowrap;
        gap: 0.3vmin;
        align-items: center;
        font-size: 2.5vh;
        text-align: center;
    }

    .tip-title {
        font-size: 3vh;
        font-weight: bold;
    }

</style>