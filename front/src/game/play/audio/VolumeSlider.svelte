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
        margin-left: 0.5vh;
        height: 100%;

        grid-area: volume;
        justify-self: start;
        align-self: center;

        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        gap: 0.5vh;
    }

    img {
        width: 2vh;
        height: 2vh;
        align-self: center;
    }
    
    /* fundo completo do slider */
    input {
        -webkit-appearance: none;
        
        align-self: center;
        height: 8%;
        width: 50%;
        /* fundo do slider */
        background-image: linear-gradient(#0BBA48, #0BBA48);
        background-repeat: no-repeat;

        /* fundo do slider preenchido */
        background-color: #FAFAFA;
        border-radius: 5px;
        
    }

    input::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 1vh;
        width: 1vh;
        border-radius: 50%;
        background: #0BBA48;
        cursor: pointer;
    }

    input::-moz-range-thumb {
        -webkit-appearance: none;
        height: 1vh;
        width: 1vh;
        border-radius: 50%;
        background: #0BBA48;
        cursor: pointer;

    }

    input::-ms-thumb {
        -webkit-appearance: none;
        height: 1vh;
        width: 1vh;
        border-radius: 50%;
        background: #0BBA48;
        cursor: pointer;
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