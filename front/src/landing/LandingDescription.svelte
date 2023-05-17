<script>
    import { fade, fly } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
    import Text from '../common/Text.svelte';
    
    let dispatch = createEventDispatcher();
    let page = "main";      // main, tutorial, about
    let nextPage = "none";

    function clear(next) {
        page = "none";
        nextPage = next;
    }

    function update() {
        page = nextPage;
        dispatch("outroend");
    }

</script>

<div class="landing-description">
    <div class="texts">
        {#if page === "main"}
            <div 
                class="short-description" 
                in:fly="{{ y: 30, duration: 1000}}" out:fade
                on:outroend={update}
            >
                <Text key="landing-title" />
            </div>
            
            <div 
                class="long-description" 
                in:fly="{{ y: 30, duration: 1000}}" out:fade
            >
                <Text key="landing-description" />
            </div>
        
        {:else if page === "about"}
            <p class="small-text" transition:fly="{{ y: -200, duration: 500}}" on:outroend={update}>
                <br>
                Guessify é um jogo para você testar seus conhecimentos nas músicas que você costuma ouvir.
                Diferentemente dos outros jogos semelhantes, Guessify permite utilizar seu Spotify para escolher
                suas playlists e albums que costuma ouvir.
                <br>
                O jogo atualmente ainda está em desenvolvimento. Podem ocorrer vários problemas com a conexão com o Spotify,
                assim como inesperados bugs.
                <br>
                É seguro? Sim, Guessify não armazena nenhuma informação sua além do seu token de acesso fornecido pelo Spotify,
                pode ser removido a qualquer momento ao clicar no botão de sair na tela inicial.
                <br>
                Deseja contribuir? O código fonte está disponível no <a href="https://github.com/Leinadium/guessify">Github</a>.
                
            </p>
        {:else if page === "tutorial"}
                <!-- TODO: tutorial description -->
            <p class="small-text" transition:fly="{{ x: -200, duration: 500}}" on:outroend={update}>
                <!-- tutorial was removed -->
            </p>
        {/if}
    </div>
    
    <!-- svelte-ignore a11y-invalid-attribute -->
    <div class="pagination">
        {#if page === "main"}
            <a href="#" style="text-align: center" class="goto goto-text" on:click|preventDefault="{() => clear("about")}">
                <Text key="landing-about" />
            </a>
        {:else}
            <a href="#" style="text-align: center"class="goto goto-text" on:click|preventDefault="{() => clear("main")}">
                <Text key="landing-goback" />
            </a>
        {/if}
    </div>
    
</div>



<style>
    .landing-description {
        width: 100%;
        height: 60vh;

        display: inline-flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        align-items: center;
        gap: 10%;
    }

    .texts {
        box-sizing: border-box;
        height: 50vh;

        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        align-items: center;
        text-align: center;
        color: #ffffff;
        overflow-y: auto;
    }

    .short-description {
        color: #fff;
        font-size: 8vmin;
        font-weight: 700;
    }

    .long-description {
        color: #fefefe;
        font-size: 4vmin;
        font-weight: 300;
    }

    .pagination {
        width: 50%;
        gap: 3vmax;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-evenly;
    }

    .goto {
        color: #717171;
        font-weight: 500;
        font-size: 4vmin;
    }

    .goto-text {
        width: 30vw;
    }

    p {
        box-sizing: border-box;
        height: 100%;
        margin: 0;
        padding: 0;
        padding-left: 10vw;
        padding-right: 10vw;
        font-size: 3vh;
        font-weight: 300;
        color: #fefefe;
        text-align: center;
    }
    br {
        box-sizing: content-box;
        display: block;
        content: "";
        margin-top: 5%;
    }

</style>