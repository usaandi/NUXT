<template>
  <div>
    <div class="tabs">
      <ul>
        <li v-for="tab in tabs" :class="{'is-active':tab.isActive}">
          <a @click="setActive(tab.title)">{{tab.title}}</a>
        </li>
      </ul>
    </div>
    <div class="tab-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Tabs",
    data() {
      return {
        tabs: [],
      }
    },
    methods: {
      setActive(title) {
        this.tabs.map(tab => {
          tab.title === title ? tab.isActive = true : tab.isActive = false;

        })
      }
    },
    created() {
      this.tabs = this.$children;
    }
  }
</script>

<style scoped>

</style>
