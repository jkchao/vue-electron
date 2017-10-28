<template>
  <div class="keyword">

    <div class="head font-futura">
      <div>
        <p><i class="iconfont icon-search"></i></p>
        <p> {{ keyword }} </p>
      </div>
    </div>

    <div class="article">
      <articleView
        :articleList = "list"
        :haveMoreArt="haveMoreArt"
        @loadMore="loadMore"></articleView>
    </div>
  </div>
</template>
<script>

import articleView from '@/components/common/article.vue'

export default {

  name: 'keyword',

  data () {
    return {}
  },

  components: {
    articleView
  },

  computed: {

    keyword () {
      return this.$route.params.keyword
    },

    list () {
      return this.$store.state.article.art.list
    },

    haveMoreArt () {
      return this.$store.state.article.art.pagination.current_page !==
      this.$store.state.article.art.pagination.total_page
    }
  },

  methods: {
    loadMore () {
      this.$store.dispatch('getArtList', {
        current_page: this.$store.state.article.art.pagination.current_page + 1,
        keyword: this.keyword
      })
    }
  },

  created () {
    this.$store.dispatch('article/getArtList', { keyword: this.$route.params.keyword })
  },

  beforeRouteUpdate (to, from, next) {
    this.$store.dispatch('article/getArtList', { keyword: to.params.keyword })
    next()
  }
}
</script>

<style scoped lang="scss">

.head {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48.5rem;
  height: 20rem;
  margin: 0 auto $normal-pad auto;
  font-size: 3rem;
  color: $black;
  background: $module-bg;
  text-align: center;

  P {
    line-height: 3.5rem;
  }

  i {
    font-size: 3.5rem;    
  }
}
</style>
