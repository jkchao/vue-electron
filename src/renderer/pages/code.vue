<template>
  <section  class="think" >
    <div class="head">
      <p class="font-futura">CREATE ART WITH CODE</p>
    </div>
    <div class="article">
      <articleView
        :articleList = "list"
        :haveMoreArt="haveMoreArt"
        @loadMore="loadMore"></articleView>
    </div>
  </section>
</template>

<script>
import articleView from '@/components/common/article.vue'

export default {
  name: 'code',

  data () {
    return {}
  },

  computed: {

    list () {
      return this.$store.state.article.art.list
    },

    haveMoreArt () {
      return this.$store.state.article.art.pagination.current_page !==
      this.$store.state.article.art.pagination.total_page
    }
  },

  components: {
    articleView
  },

  methods: {
    loadMore () {
      this.$store.dispatch('article/getArtList', {
        current_page: this.$store.state.article.art.pagination.current_page + 1,
        type: 1
      })
    }
  },

  created () {
    this.$store.dispatch('article/getArtList', { type: 1 })
  }
}
</script>


<style lang="scss" scoped>
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48.5rem;
  height: 20rem;
  margin: 0 auto $normal-pad auto;
  font-size: 1.3rem;
  color: $black;
  background: $module-bg;
}
</style>
