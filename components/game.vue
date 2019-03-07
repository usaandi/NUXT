<template>
  <div>
    <button v-if="" @click="getCardBack">Draw a Card</button>
  </div>
</template>

<script>
  import axios from "../.nuxt/axios";

  export default {
    name: "game",
    data() {
      return {
        url: 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=',
        count: 1,
        currentDeck: {},
      }
    },
    methods: {
      getCardBack() {
        this.$axios.get(this.url + this.count).then(response => {
          this.currentDeck = response.data;
        });
      }

    }
  }

</script>

<style scoped>

</style>
