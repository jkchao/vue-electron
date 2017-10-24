<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'app',
  created () {
    this.$store.dispatch('init')
  }
}
</script>

<style lang="scss">
@import './assets/scss/index.scss';
#app {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}
</style>
