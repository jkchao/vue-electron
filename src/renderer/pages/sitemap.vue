<template>
  <div class="sitemap">
    <h3 class="font-futura">Articles</h3>
    <ul class="sitemap-list">
      <li
        class="sitemap-item"
        v-for="(item,index) in list"
        :key="item._id">
        <article>
          <time>
            {{ item.create_at | dateFormat('yyyy.MM.dd') }}
          </time>
          <br/>
          <router-link :to="`/article/${item._id}`">
            {{ item.title | text(40)}}
          </router-link>
        </article>
      </li>
      <li class="sitemap-item" v-if="list.length === 0">
        暂无文章
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'sitemap',

  computed: {

    list () {
      return this.$store.state.sitemap.art.list
    }
  },

  created () {
    this.$store.dispatch('sitemap/getSitemap', { page_size: 1000 })
  }
}
</script>

<style scoped lang="scss">
.sitemap {
  background: $module-bg;
  padding: 4rem 2rem 4rem 4rem;

  >.sitemap-list {
    padding:  0 $lg-pad;

    >.sitemap-item {
      padding: 1rem;

      >article {
        position: relative;

        &::before {
          content: " ";
          position: absolute;
          left: 0px;
          top: 6px;
          width: 6px;
          height: 6px;
          margin-left: -4px;
          background: $dividers;
          border-radius: 50%;
        }

        >time {
          margin-left: $md-pad;
          font-size: $font-size-small;
        }

        >a {
          display: inline-block;
          margin-top: .5rem;
          margin-left: $md-pad;
          color: $black;
          text-decoration: underline;
        }
      }
    }
  }
}

</style>
