<template>
  <div v-show="isActive">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "Tab",
    props: ['title', 'active'],
    data() {
      return {
        isActive: false,
      }
    },
    created() {
      this.isActive = this.active;
    }
  }
</script>

<style scoped>

</style>
