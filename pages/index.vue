<template>
  <div class="section">
    <button class="button" @click="isDark=!isDark">Toggle</button>
    <card :success="isDark" :dark="isDark">Hey</card>
    <card>Hey</card>
  </div>
</template>

<script>
  import card from "../components/card";

  export default {
    components: {card},
    data() {
      return {
        isDark: false,
      }
    },
    methods: {}
  }
</script>
<style>

</style>
