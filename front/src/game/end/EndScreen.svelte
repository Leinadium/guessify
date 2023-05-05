<script>
    import { gameScore, language } from "../../lib/stores";
    import { MAX_SCORE, getText } from "../../lib/utils";
    import { createEventDispatcher, onMount } from "svelte";
    import { fade } from "svelte/transition";
    import BigInfo from "./BigInfo.svelte";
    import SmallInfo from "./SmallInfo.svelte";
    import HistoryBox from "./HistoryBox.svelte";
    import CollectionButtons from "./buttons/CollectionButtons.svelte";
    

    // props
    export let gameInfo = {
        maxRounds: 0,
        content: {},
        played: [],
    };
    export let endGameInfo = {
        totalCorrect: 0,
        percentScore: 0,
        totalMs: 0,
        history: []     // {track: {}, score: int, playedMs: int}
    };

    // average of playedMs where score > 0 from history 
    const avgMs = () => {
        let sum = 0;
        let count = 0;
        for (let i = 0; i < endGameInfo.history.length; i++) {
            if (endGameInfo.history[i].score > 0) {
                sum += endGameInfo.history[i].playedMs;
                count++;
            }
        }
        return sum / count;
    }

    var color;
    if (endGameInfo.percentScore >= 80) {
        color = "green";
    } else if (endGameInfo.percentScore >= 50) {
        color = "yellow";
    } else {
        color = "red";
    }

    let dispatch = createEventDispatcher();
    function handlePlayAgain() {
        dispatch("playAgain", {content: gameInfo.content});
    }

    let transition = 0;
    function addTransition() {
        transition += 1;
    }


</script>

<div class="end-screen" in:fade on:introend={addTransition}>
    <div class="status">
        {#if transition >= 0}
            <BigInfo 
                number={$gameScore.toFixed(0)} 
                text={`/${MAX_SCORE}`} 
                description={getText($language, "game-your-score")} 
                color={color}
                on:introend={addTransition}
            />
        {/if}
        <div class="status-lower">
            {#if transition >= 1}
            <SmallInfo 
                number={endGameInfo.totalCorrect.toFixed(0)} 
                text={`/ ${gameInfo.maxRounds} ${getText($language, "game-rounds")}`} 
                description="Correct guesses"
                on:introend={addTransition}
            />
        
            <SmallInfo 
                number={(avgMs() / 1000 || 0).toFixed(1)} 
                text={getText($language, "game-seconds")} 
                description={getText($language, 'game-average')}
                on:introend={addTransition}
            />
        
            <SmallInfo 
                number={(endGameInfo.totalMs / 1000).toFixed(1)} 
                text={getText($language, "game-seconds")} 
                description={getText($language, "game-total")}
                on:introend={addTransition}
            />
            {/if}
        </div>    
    </div>

    {#if transition >= 2}
        <div class="history-wrapper" in:fade="{{duration: 500}}" on:introend={addTransition}>
            <div class="history-title">
                {gameInfo.maxRounds} 
                {getText($language, "game-rounds-of")} 
                {gameInfo.content.name}
            </div>
            <div class="history">
                {#each endGameInfo.history as historyElement}
                    <HistoryBox {...historyElement} />
                {/each}
            </div>
        </div>
    {/if}


    {#if transition >= 3}
        <CollectionButtons
            name={gameInfo.content.name}
            score={$gameScore}
            on:playAgain={handlePlayAgain} 
            on:newGame 
            on:introend={addTransition}
        />
    {/if}
</div>

<style>
    .end-screen {
        width: 80vmin;
        display: flex;
        flex-flow: column;
        justify-content: flex-start;
        align-items: center;
        gap: 2vh;
    }

    .status {
        width: 100%;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        gap: 1vh;
    }

    .status-lower {
        width: 100%;
        height: 7vh;
        display: flex;
        flex-flow: row;
        justify-content: center;
        align-items: flex-start;
    }

    .history {
        background: inherit;
        border-radius: inherit;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 1vh 4vh 2vh 2vh;
        overflow-y: scroll;
    }

    .history-wrapper {
        background: #121212;
        border-radius: 1vh;
        width: 100%;
        height: 35vh;
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
    }

    .history-title {
        width: 100%;
        height: fit-content;
        padding-top: 0.5vh;
        padding-bottom: 0.3vh;
        font-size: 2vh;
        text-align: center;
        color: #787878;
        white-space: nowrap;
        overflow-x: hidden;
    }
</style>