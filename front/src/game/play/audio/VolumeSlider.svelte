<script>
    export let value = 0.7;

    let valueSlider = value * 100;
    $: {
        value = valueSlider / 100;
        console.log(valueSlider, value);
    }

</script>


<input 
    id="volume-slider"
    type=range
    bind:value={valueSlider}
    min="0" 
    max="100"
    style="background-size: {valueSlider}% 100%"
>


<style>
    
    /* fundo completo do slider */
    input {
        -webkit-appearance: none;
        
        flex: 1 1 auto;
        height: 20%;
        width: 20%;
        /* fundo do slider */
        background: white;

        /* fundo do slider preenchido */
        background-image: linear-gradient(#ff4500, #ff4500);
        /* background-size: 70% 100%; */
        background-repeat: no-repeat;

        border-radius: 5px;
        
    }

    input::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: #ff4500;
        cursor: pointer;
    }

    input::-moz-range-thumb {
        -webkit-appearance: none;
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background: #ff4500;
        cursor: pointer;

    }

    input::-ms-thumb {
        -webkit-appearance: none;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: #ff4500;
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