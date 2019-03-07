<template>
  <child @lol="alertMe">

  </child>
</template>

<script>
  import Child from "./child";

  export default {
    name: "parent",
    components: {Child},
    methods: {
      alertMe() {
        alert('hello');
      }
    },
    created() {
    }
  }
</script>

<style scoped>

</style>
