<template>
  <div class="tag">
    <div class="head font-futura">
      <div>
        <p><i class="iconfont icon-tag"></i></p>
        <p> {{ tag.name }} </p>
        <!-- <p>{{ tag.descript }}</p> -->
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

  name: 'tag',

  data () {
    return {}
  },

  components: {
    articleView
  },

  computed: {

    tag () {
      const _id = this.$route.params.tag
      return this.$store.state.tag.data.list.find(item => item._id === _id)
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
        tag: this.$route.params.tag
      })
    }
  },

  created () {
    this.$store.dispatch('article/getArtList', { tag: this.$route.params.tag })
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
