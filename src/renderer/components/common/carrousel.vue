<template>
   <div class="carrousel">
    <div v-swiper:mySwiper="option" class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide item" v-for="list in con" :key="list._id">
          <img 
          :src="list.thumb + '?imageView2/1/w/679/h/280'"/>
          <router-link :to="`/article/${list._id}`" class="swiper-title">{{ list.title }}</router-link>
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-white"></div> 
    </div>
  </div>
</template>

<script>

export default {
  name: 'carrousel',

  props: ['option', 'con'],

  data () {
    return {}
  }
}
</script>

<style lang="scss">

  .carrousel {
    position: relative;
    margin-bottom: $normal-pad;
    height: 100%;
    overflow: hidden;

    >.swiper-pagination-bullet {
      opacity: .5;
    }

    >.swiper-pagination-bullet-active {
      background-color: lighten($black, 20%);
      opacity: 1;
    }
  }
</style>