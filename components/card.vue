<template>


  <div class="card" :class="{'has-text-success':success,'has-background-dark':dark}">
    <div class="card-content">
      <div class="content">
        <p>
          <slot></slot>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Card",
    props: ['success', 'dark'],
    data() {
      return {}
    }
  }
</script>

<style scoped>

</style>
