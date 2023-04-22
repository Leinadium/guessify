<script>
    import { volume } from "../../../lib/stores";
    
    let valueSlider = $volume * 100;
    $: {
        $volume = valueSlider / 100;
    }

</script>

<div class="volume">
    <img src="/assets/volume.svg" alt="Volume">

    <input 
        id="volume-slider" type=range
        min="0" max="100"
        style="background-size: {valueSlider}% 100%"
        bind:value={valueSlider}
    >
</div>

<style>

    .volume {
        margin-left: 0.5vmin;
        height: 100%;
        width: min(15vmin, 100%);

        grid-area: volume;
        justify-self: start;
        align-self: center;

        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        gap: 0.5vmin;
    }

    img {
        width: 1.5vh;
        height: 1.5vh;
        align-self: center;
    }
    
    /* fundo completo do slider */
    input {
        -webkit-appearance: none;
        align-self: center;
        height: 1vh;
        width: 100%;
        /* fundo do slider */
        background-image: linear-gradient(#0BBA48, #0BBA48);
        background-repeat: no-repeat;

        /* fundo do slider preenchido */
        background-color: #FAFAFA;
        border-radius: 0.5vmin;
        cursor: pointer;
        
    }

    input::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 1.8vh;
        width: 1.8vh;
        border-radius: 50%;
        background: #0BBA48;
    }

    input::-moz-range-thumb {
        -webkit-appearance: none;
        height: 1.8vh;
        width: 1.8vh;
        border-radius: 50%;
        background: #0BBA48;
    }

    input::-ms-thumb {
        -webkit-appearance: none;
        height: 1.8vh;
        width: 1.8vh;
        border-radius: 50%;
        background: #0BBA48;
    }

    input::-webkit-slider-runnable-track {
        -webkit-appearance: none;
        box-shadow: none;
        border: none;
        background: transparent;
    }

    input::-moz-range-track {
        -webkit-appearance: none;   
        box-shadow: none;
        border: none;
        background: transparent;
    }

    input::-ms-track {
        -webkit-appearance: none;
        box-shadow: none;
        border: none;
        background: transparent;
    }

</style>