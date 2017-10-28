<template>
  <div class="date">
    <div class="head font-futura">
      <div>
        <p><i class="iconfont icon-date"></i></p>
        <p> {{ date }} </p>
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

  name: 'date',

  data () {
    return {}
  },

  components: {
    articleView
  },

  computed: {

    date () {
      return this.$route.params.date
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
      this.$store.dispatch('article/getArtList', {
        current_page: this.$store.state.article.art.pagination.current_page + 1,
        date: this.date
      })
    }
  },

  created () {
    this.$store.dispatch('article/getArtList', { tag: this.$route.params.date })
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
  font-size: 2.5rem;
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
