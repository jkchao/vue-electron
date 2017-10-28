<template>
  <div class="app">
    <div class="app-main">
      <div class="head-box">
        <my-header ></my-header>
      </div>
      <background></background>
      <transition-group tag="div" class="container clearfix main-container" name="slide-up">
        <div
          class="content-left" 
          key="1" 
          :class="{
            'full-page': !isAsdiePage
          }">
          <transition name="fade" mode="out-in">
            <router-view></router-view>            
          </transition>
        </div>
        <div
        class="content-right" 
        v-if="isAsdiePage" 
        key="2">
          <keep-alive>
            <asideView></asideView>
          </keep-alive>
        </div>
      </transition-group>
      <my-footer v-if="!isError"></my-footer>
    </div>
    <scoll-top></scoll-top>
  </div>
</template>


<script>

import myFooter from '@/components/layouts/footer.vue'
import myHeader from '@/components/layouts/header.vue'
import background from '@/components/layouts/background.vue'
import asideView from '@/components/layouts/aside.vue'
import scollTop from '@/components/layouts/scollTop.vue'

export default {
  name: 'app',

  components: {
    myFooter,
    myHeader,
    background,
    asideView,
    scollTop
  },

  computed: {
    isAsdiePage () {
      return this.$store.state.options.isAsidePage
    },

    isError () {
      return this.$store.state.options.isError
    }
  },

  created () {
    this.$store.dispatch('init')
  }
}
</script>

<style lang="scss">

@import '../assets/scss/index.scss';

.app {

  >.app-aside {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    height: 100%;
    width: 60%;
    background: $white;
    @include css3-prefix('transform', 'translateX(-100%)');
    @include transition(all .3s ease-out);
  }

  >.app-aside.open {
    @include css3-prefix('transform', 'translateX(0)');
  }

  >.app-main {
    @include transition(all .3s ease-out);

    >.main-container {
      min-height: calc(100vh - 142px);
    }
  }
}

.content-left {
  position: relative;
  width: 48.5rem;
  float: left;
  @include css3-prefix(transition, all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0));
}

.content-left.full-page{
  width: 100%;
  @include css3-prefix(transition, width .5s cubic-bezier(1.0, 0.5, 0.8, 1.0));
}

.content-right {
  width: 20.5rem;
  float: right;
}
</style>
