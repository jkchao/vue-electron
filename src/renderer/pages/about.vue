<template>
  <div class="about">
    <div class="info-box">
      <div class="info font-futura">
        <div class="list">
          <i class="iconfont icon-user"></i>
          <span class="list-content">Guo Wenchao, a 90s boy, Web Engineer.</span>
        </div>
        <div class="list">
          <i class="iconfont icon-like"></i>
          <span class="list-content">Code, read, and music.</span>
        </div>
        <div class="list">
          <i class="iconfont icon-music"></i>
          <span class="list-content">Folk and Soft Music.</span>
        </div>
        <div class="list">
          <i class="iconfont icon-coffee"></i>
          <span class="list-content">Hello world!</span>
        </div>
        <div class="list">
          <i class="iconfont icon-comments"></i>
          <span class="list-content icons">
            <a href="https://github.com/jkchao" target="_blank"><i class="iconfont icon-github"></i></a>
            <a href="https://juejin.im/user/5858c896128fe1006b86cb51" target="_blank"><i class="iconfont icon-juejin"></i></a>
            <a href="https://weibo.com/5329847417/profile?rightmod=1&wvr=6&mod=personinfo" target="_blank"><i class="iconfont icon-weibo"></i></a>
            <a href="" target="_blank"><i class="iconfont icon-twitter"></i></a>
            <a href="https://segmentfault.com/u/sanmao_58e1f28560e06" target="_blank"><i class="iconfont icon-sf"></i></a>
            <!-- <a href="" target="_blank"><i class="iconfont icon-stackoverflow"></i></a> -->
            <!-- <a href="" target="_blank"><i class="iconfont icon-zhihu"></i></a> -->
            <a href="mailto:jkchaom@gmail.com" target="_blank"><i class="iconfont icon-email"></i></a>
            <a
              href="javascript:;" 
              class="wechat"
              @mouseover="showBox = true"
              @mouseleave="showBox = false"><i class="iconfont icon-wechat"></i></a>
          </span>
          <transition name="fade">
            <div 
              class="wechat-box" 
              v-show="showBox"
              @mouseover="showBox = true"
              @mouseleave="showBox = false">
              <img src="/static/images/code.jpeg" alt="code" width="150px">
              <span class="arrow"></span>
            </div>
          </transition>
        </div>
      </div>
      <div class="user-box">
        <div class="user">
          <img :src="user.gravatar" alt="" width="100%">
        </div>
      </div>
    </div>
    <div class="text-box font-futura">
      <div class="text">
        <p>Too young too simple, sometimes native.</p>
        <p>Have so many new ideas, maybe i will go to relize it.</p>
        <p>Enjoy the present.</p>
        <p>Always on the road.</p>
        <p>All of me in the code and music.</p>
      </div>
    </div>

    <div
      class="foot">
        <div class="foot-box">
          <p>我走过山时，山不说话，</p>
          <p>我路过海时，海不说话。</p>
        </div>
    </div>
  </div>
</template>

<script>

export default {

  name: 'about',

  data () {
    return {
      showBox: false
    }
  },

  computed: {

    user () {
      return this.$store.state.options.adminInfo
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/scss/index.scss';
.about {
  margin: 0 auto;
  width: $container-min-width;

  >.info-box {
    // display: grid;
    // grid-template-columns: auto 14rem;
    // grid-gap: 1rem;
    display: flex;
    justify-content: space-between;

    >.info {
      position: relative;
      width: calc(100% - 14rem - 1rem);
      padding: $normal-pad $lg-pad;
      background: $module-bg;

      >.list {
        display: flex;
        // display: grid;
        // grid-template-columns: 1rem auto;
        // grid-gap: 1.5rem;
        margin: .5rem;
        padding: 0 1rem;
        height: 36px;
        line-height: 36px;

        i {
          color: $dividers;
        }

        >.list-content {
          margin-left: 1rem;
        }


        span.icons {
          display: flex;

          a {
            margin-right: 1rem;
          }

          i {
            color: $black-light;
            @include transition(all .5s);

            &:hover {
              font-size: 1.3rem;
              color: $black;
            }
          }
        }

        >.wechat-box {
          position: absolute;
          right: 11rem;
          bottom: -10rem;
          padding: .5rem;
          background: lighten($module-hover-bg, 30%);

          >.arrow {
            position: absolute;
            display: inline-block;
            width: 0;
            height: 0;
            border-width: 7px;
            border-style: dashed dashed solid;
            border-color: transparent transparent lighten($module-hover-bg, 30%);
            overflow: hidden;
            font-size: 0;
            line-height: 0;
            vertical-align: top;
            top: -14px;
            left: calc(50% - 3.5px);
          }
        }
      }
    }

    >.user-box {
      background: $module-bg;
      width: 14rem;

      .user {
        padding: 1rem;
        overflow: hidden;

        img {
          max-width: 100%;
          @include border-radius(4px);
        }
      }
    }
  }

  >.text-box {
    margin-top: 1rem;

    >.text {
      padding: 5rem 10rem;
      background: $module-bg;
      color: $black;
      line-height: 2rem;
    }
  }

  >.foot {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0 0 0;
    height: 390px;
    background: url('https://static.jkchao.cn/bg.jpg?imageView2/2/w/700') no-repeat center;
    color: $white;
    font-size: 1.3rem;

    p {
      line-height: 2rem;
    }
  }
}

</style>
