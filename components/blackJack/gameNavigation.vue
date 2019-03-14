<template>
  <div>
    <nav class="level navbar">
      <div class="level-left">
        <div class="level-item">
          <h1 class="title">BLACKJACK</h1>
        </div>
        <div class="level-item">
          <button class="is-fullwidth button has-background-info has-text-white" @click="getCardBack">New Game</button>
        </div>
        <div class="level-item">
          <button class="button is-fullwidth has-background-danger has-text-white" @click="drawCard">Hit</button>
        </div>
        <div class="level-item">
          <button class="button is-fullwidth has-background-warning has-text-black">Stand</button>
        </div>

      </div>
      <div class="level-right">
        <p class="level-item">Cards Remaining: {{currentDeck.remaining}}</p>
      </div>
    </nav>
    <nav class="level">
      <div class="level-left"></div>
      <div class="level-right">
        <p class="level-item">Current Game: {{currentDeck.deck_id}}</p>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    name: "gameNavigation",
    methods: {
      getCardBack() {
        this.dispatchStore('startGameAgain')
      },
      drawCard() {
        this.dispatchStore('drawCard');
      }
    },
    created() {
      this.dispatchStore('generateDeck');
    },
    computed: {
      currentDeck() {
        return this.$store.state.cardPack;
      },
      dispatchStore() {
        return this.$store.dispatch;
      }
    }
  }
</script>

<style scoped>

</style>
