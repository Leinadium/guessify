<div class="landing">
    <div class="texts">
        <div class="short-description">
            Xxx xxxxx xxx xxxxx?
        </div>
        
        <div class="long-description">
            zzzz zzzzzzz zzz zzzzzz zzzzzz, zzzzzz zzzzzzzz zzzzzz z zzzzz zzzz zzzz,
            zzzz zzzz zzzzzz, zzz zzzz zzzzz zzzz zzzzz!
        </div>
    </div>

    <button>
        <spam class="login">Login with <img class="spotify-logo-button" src="/assets/spotify-logo-black.png" alt="Spotify"></spam>
        <spam class="requires">Requires Spotify Premium</spam>
    </button>

</div>



<style>
    div {
        font-family: 'Circular Std';
    }
    
    .landing {
        height: 100%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        align-items: center;
    }

    .texts {
        text-align: center;
    }

    .short-description {
        color: #fff;
        font-size: 10vh;
        font-weight: 700;
        margin-bottom: 10vh;
    }

    .long-description {
        color: #fefefe;
        font-size: 5vh;
        font-weight: 300;
    }

    button {
        width: 20vw;
        aspect-ratio: 3 / 1;
        border-radius: 3vw;
        background-color: #1DB954;
        border: 0.2vw solid black;
        box-sizing: border-box;
        cursor: pointer;

        box-shadow: 0px 4px 16px rgba(17,17,26,0.1), 0px 8px 24px rgba(17,17,26,0.1), 0px 16px 56px rgba(17,17,26,0.1);

        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;

        transition-duration: 0.4s;
    }

    button:hover {
        background-color: darkgreen;
    }

    .login {
        font-family: 'Circular Std';
        font-size: 1.6vw;
        font-weight: bold;
        color: #191414;

        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 0.5vw;
    }

    .spotify-logo-button {
        height: 2.3vw;
        aspect-ratio: 3.37 / 1;
    }

    .requires {
        margin-top: 1vh;
        font-family: 'Circular Std';
        font-size: 1 vh;
        font-weight: 300;
        font-style: italic;
        color: #222326;
    }

    
</style>