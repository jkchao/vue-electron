<template>
  <div class="article-list">
    <div class="article-cont">
      <h3 class="font-futura">{{ article.title }}</h3>
      <div class="meta">
        <span class="time">{{ article.create_at | dateFormat('yyyy.MM.dd hh:mm') }}</span>
        <span class="num">字数 {{ article.content ? article.content.length : 0 }}</span>
        <span class="view">阅读 {{ article.meta ? article.meta.views : 0 }}</span>
        <span class="view">喜欢 {{ article.meta ? article.meta.likes : 0  }}</span>
        <span class="comment">评论 {{ article.meta ? article.meta.comments : 0  }}</span>
        <span class="count">
          <!-- <span class="disqus-comment-count" :data-disqus-identifier="article._id"></span> -->
        </span>
      </div>
      <div class="article-thumb">
        <img :src="article.thumb" alt="">
      </div>
      <div class="content" v-html="articleContent"></div>
    </div>
    <div class="item">
      <div class="info">
        <div class="info-left">
          <span class="likeing" @click="like">
            <i
              :class="{'is-liked': isLiked}"
              class="iconfont icon-like like"
              ></i>
              <span>{{ article.meta ? article.meta.likes : 0 }}</span>
          </span>

          <span class="tag">
            <i class="iconfont icon-tag"></i>
            <router-link 
              v-for="list in article.tag" 
              class="tag-list" 
              :key="list._id"
              :to="`/tag/${list._id}`"> {{ list.name }}</router-link>
          </span>
        </div>
        <div>版权信息：
          <a href="https://creativecommons.org/licenses/by-nc/3.0/cn/deed.zh"
             target="_blank">非商用-署名-自由转载</a>
        </div>
      </div>
      <div class="share">
        <share class="article-share"></share>
      </div>
    </div>
    <div class="comment">
      <comments :post-id="article.id" v-if="article.title"></comments>
    </div>

    <dialog-com 
      :visible.sync="showDialog" 
      :img="img">
    </dialog-com>
  </div>
</template>

<script>
import marked from '@/utils/marked'
import share from '@/components/layouts/share'
import dialogCom from '@/components/common/dialog'
import comments from '@/components/common/comments'
import lazyImg from '@/utils/lazyImg'
export default {
  name: 'article',

  data () {
    return {
      likeArticles: [],
      showDialog: false,
      img: ''
    }
  },

  components: { share, dialogCom, comments },

  computed: {

    article () {
      return this.$store.state.article.details
    },

    articleContent () {
      return marked(this.article.content)
    },

    isLiked () {
      return this.likeArticles.includes(this.article._id)
    }
  },

  methods: {
    async like () {
      if (this.isLiked) return
      const res = await this.$store.dispatch('article/likeArt', { _id: this.article._id })
      if (res.code !== 1) alert(`喜欢文章失败：${res.message}`)
      else {
        // this.article.meta.likes += 1
        this.likeArticles.push(this.article._id)
        window.localStorage.setItem('LIKE_ARTICLS', JSON.stringify(this.likeArticles))
      }
    },

    init () {
      this.likeArticles = JSON.parse(window.localStorage.getItem('LIKE_ARTICLS') || '[]')
    },

    hide () {
      this.showDialog = false
    },

    initEvent () {
      setTimeout(() => {
        lazyImg('.img-pop')
        const list = document.querySelectorAll('.img-pop')
        for (let i = 0; i < list.length; i++) {
          list[i].addEventListener('click', (e) => {
            e.stopPropagation()
            this.showDialog = true
            this.img = list[i].getAttribute('src')
          })
        }
      }, 1000)
    }
  },

  created () {
    this.$store.dispatch('article/getArt', { id: this.$route.params.id })
  },

  mounted () {
    this.init()
    this.initEvent()
  }
}
</script>

<style lang="scss" scope>

@import '../../assets/scss/mixin.scss';


.article-list {
  margin: auto;
  width: 48.5rem;

  >.article-cont {
    padding: $lg-pad;
    background: $module-bg;

    >.meta {
      margin-top: .3rem;
      font-size: .8rem;
      color: #969696;

      span {
        margin-right: .5rem;
      }
    }

    >h3 {
      font-size: 1.3rem;
    }

    >.article-thumb {
      margin: $lg-pad 0;
      img {
        max-width: 100%;
      }
    }

    .content {
      color: $black;
      word-wrap: break-word;

      a {
        font-weight: bold;
        margin: 0 .1rem;

        &.image-link {
          margin: 0;
        }

        &:hover {
          text-decoration: underline;
        }
      }

      img {
        max-width: 100%;
        margin: .5rem auto;
        display: block;
        text-align: center;
        border-radius: $radius;
        transition: all .25s;
        opacity: .9;

        &.img-pop {
          cursor: zoom-in;
        }
      }

      p {
        line-height: 1.8rem;
        text-indent: 2rem;
        margin-bottom: 1rem;

        &.text-center {
          text-align: center;
        }

        &.text-right {
          text-align: right;
        }
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin: 1.5rem 0;
        padding-left: 0;
        line-height: 1.8rem;
        font-weight: 700;
        text-indent: 0;
      }

      hr {
        height: 0.1rem;
        background: #e1e4e8;
        border: 0;
      }

      blockquote {
  
        padding: 0 1rem;
        margin-bottom: 1rem;
        color: #6a737d;
        border-left: 0.25rem solid #dfe2e5;
  
        p {
          text-indent: 0rem;

          &:first-child {
            margin-top: 0;
          }
          &:last-child {
            margin-bottom: 0;
          }
        }
      }

      ul {
        list-style-type: square;
      }

      ul,
      ol {
        padding-left: 2rem;

        >li {
          line-height: 1.8rem;
          padding: .5rem;
          list-style-type: disc;


          >p {
            text-indent: 0;
          }

          >ul {

            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }

      ul {
        list-style: disc;
      }

      code {
        padding: .2rem .4rem;
        margin: 0;
        font-size: 85%;
        border-radius: $radius;
        background-color: $module-hover-bg;
      }

      pre {
        overflow: auto;
        line-height: 1.45;
        background-color: rgba(0,0,0,.8);
        border-radius: 3px;
        margin-bottom: 1rem;
        word-wrap: normal;

        >.code-lines {
          position: absolute;
          left: 0;
          top: 2.8rem;
          margin: 0;
          padding: 1rem 0;
          width: 2.5rem;
          height: calc(100% - 2.8rem);
          text-align: center;
          background-color: rgba(0, 0, 0, 0.2);

          >.code-line-number {
            padding: 0;
            position: relative;
            list-style-type: none;
            line-height: 1.6rem;
            transition: background-color .05s;

            &:hover {
              &:before {
                display: block;
                opacity: 1;
                visibility: visible;
              }
            }

            &:before {
              content: '';
              height: 1.6rem;
              position: absolute;
              top: 0;
              left: 2.5rem;
              width: 66rem;
              background-color: rgba(154, 154, 154, 0.2);
              display: none;
              visibility: hidden;
              opacity: 0;
            }
          }
        }

        >code {
          margin: 0;
          padding: 1rem;
          float: left;
          width: 100%;
          height: 100%;
          display: block;
          line-height: 1.6rem;
          color: rgba(255, 255, 255, 0.87);
          background-color: transparent;
        }
      }
    }
  }
  >.item {
    margin-top: 1rem;
    padding: $lg-pad;
    background: $module-bg;
    // font-size: .8rem;

    >.info {
      display: flex;
      justify-content: space-between;
      align-items: center;

      >.info-left {
        display: flex;
        align-items: center;

        >.likeing {
          span {
            margin-left: .4rem;
          }
        }
        .like {
          cursor: pointer;
          margin-right: .3rem;
        }

        .is-liked {
          color: $red;
        }


        .tag {
          margin-left: 4rem;

          a {
            margin: 0 .5rem;
            text-decoration: underline;

            &:last-child {
              margin: 0;
            }
          }
        }
      }

      a:hover {
        text-decoration: underline;
      }
    }
    >.share {
      margin-top: 1rem;
    }
  }

  .dialog {

    >.dialog-body {
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100%;
      background: transparent;

      >.dialog-content {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        img {
          display: block;
          margin: 0 auto;
          max-width: 90%;
          max-height: 90%;
          cursor: zoom-out;
        }
      }
    }
  }
}

</style>
