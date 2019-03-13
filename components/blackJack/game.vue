<template>
  <div>
    <game-navigation></game-navigation>
    <section class="section">
      <div class="columns">
        <div class="column">Player Cards
          <p>Score:{{playerScore}}</p>
          <figure class="image is-64x64" v-for="(card,index)  in playerCards">
            <img class="" :src="card.image" :key="index">
          </figure>

        </div>
        <div class="column ">
          Dealer Cards
          <p>Score:</p>
          <figure class="image is-64x64">
            <img src="https://deckofcardsapi.com/static/img/8C.png">
          </figure>
          <figure class="image is-64x64">
            <img src="https://deckofcardsapi.com/static/img/8C.png">
          </figure>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import axios from "../../.nuxt/axios";
  import GameNavigation from "./gameNavigation";

  export default {
    name: "game",
    components: {GameNavigation},
    data() {
      return {}
    },
    methods: {},
    computed: {
      dispatchStore() {
        return this.$store.dispatch;
      },
      playerCards() {
        return this.$store.state.playerCards;
      },
      dealerDeck() {
        return this.$store.state.dealerCards;
      },
      playerScore() {
        return this.$store.getters.currentPlayerScore;
      }

    }

  }

</script>

<style scoped>

</style>
