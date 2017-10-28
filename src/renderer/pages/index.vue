<template>
  <section  class="clearfix main">
    <carrousel :option="swiperOption" :con="banners"></carrousel>
    <div class="article">
      <articleView
        :articleList = "list"
        :haveMoreArt="haveMoreArt"
        @loadMore="loadMore"></articleView>
    </div>
  </section>
</template>
<script>

import carrousel from '@/components/common/carrousel.vue'
import articleView from '@/components/common/article.vue'

export default {

  data () {
    return {
      swiperOption: {
        autoplay: 3500,
        setWrapperSize: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        mousewheelControl: true,
        autoplayDisableOnInteraction: false,
        observeParents: true,
        grabCursor: true,
        preloadImages: false,
        lazyLoading: true
      }
    }
  },

  computed: {

    list () {
      return this.$store.state.article.art.list
    },

    banners () {
      return this.list.slice(0, 9)
    },

    haveMoreArt () {
      return this.$store.state.article.art.pagination.current_page !==
      this.$store.state.article.art.pagination.total_page
    }
  },

  components: {
    carrousel,
    articleView
  },

  methods: {
    loadMore () {
      this.$store.dispatch('article/getArtList', {
        current_page: this.$store.state.article.art.pagination.current_page + 1
      })
    }
  },

  created () {
    this.$store.dispatch('article/getArtList')
  }
}
</script>


<style lang="scss">

.main {
  .carrousel {
    width: 48.5rem;
    height: 20rem;
    margin: 0 auto 1rem auto;

    .swiper-slide {
      text-align: center;
      position: relative;

      >.swiper-title {
        position: absolute;
        right: $normal-pad;
        top: $normal-pad;
        padding: $normal-pad / 2;
        // background: lighten($module-hover-bg, 60%);
        color: $black;
        z-index: 999;
        cursor: pointer;

        &:hover {
          background: $module-hover-bg;
        }
      }
    }
  }
}

</style>
