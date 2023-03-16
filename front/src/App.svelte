<script>
    import GamePlay from "./game/GamePlay.svelte";

</script>

<!-- HEADER -->
<div class="header">
    <div class="header-title">Guessify</div>
    <div class="header-copyright">Leinadium @ 2023</div>
</div>

<GamePlay />


<style>
    .header {
        width: auto;
        height: 50px;
        background-color: lightblue;
    }

    .header-title {
        float: left;
    }

    .header-copyright {
        float: right
    }
</style>