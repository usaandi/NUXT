<template>
  <div class="modal" :class="{'is-active':activeState.active}">
    <div class="modal-background"></div>
    <div class="modal-content">
      <slot>
      </slot>
      <!-- Any other Bulma elements you want -->
    </div>
    <button class="modal-close is-large" aria-label="close" @click="modalClicked"></button>
  </div>
</template>

<script>
  export default {
    name: "modal",
    props: ['isActive'],
    data() {
      return {
        active: this.isActive
      }
    },
    methods: {
      modalClicked() {
        this.$store.dispatch('toggleModal');
      }
    },
    computed: {
      activeState() {
        return this.$store.state.modal;
      }
    }
  }
</script>

<style scoped>

</style>
