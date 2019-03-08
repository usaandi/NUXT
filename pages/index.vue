<template>
  <section class="section">
    <game class="container">
    </game>
  </section>
</template>

<script>


  import Modal from "../components/modal";
  import Game from "../components/blackJack/game";

  export default {
    components: {Game, Modal},
    data() {
      return {
        isDark: false,
        firstName: '',
        surname: '',
        modalIsActive: false,
      }
    },
    created() {

    },
    methods: {
      show() {
        this.$store.dispatch('toggleModal');
      }
    },
    computed: {}
  }
</script>
<style>

</style>
