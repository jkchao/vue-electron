<template>
  <footer>
    <div
      class="container clearfix font-futura">
      <span>BASE ON router + NODE + MONGODB</span>
      <span> BY
        <router-link to="/about">{{ user.name }}</router-link>
      </span>
      
    </div>
  </footer>
</template>
<script>
export default {
  name: 'footer',

  computed: {

    option () {
      return this.$store.state.options.option
    },

    user () {
      return this.$store.state.options.adminInfo
    }
  }
}
</script>

<style scoped lang="scss">

// @import '@/assets/scss/variable.scss';

footer {
  margin-top: $normal-pad;
  height: $header-height;
  line-height: $header-height;
  background: $module-bg;

  >.container {
    text-align: center;
  }
}
</style>

