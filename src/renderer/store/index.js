import Vue from 'vue'
import Vuex from 'vuex'
import EventBus from '@/utils/event-bus'
import service from '@/api'

import modules from './modules'

Vue.use(Vuex)

const actions = {
  async init ({ dispatch, commit }) {
    // tag
    dispatch('tag/getTag')

    // hot-article
    dispatch('article/getHotArt')

    // admin
    dispatch('options/getAdminInfo')

    // 网站信息
    dispatch('options/getOpt')

    // 音乐列表
    EventBus.REQUEST_LIST()
    const music = await service.getMusicLst()
      .catch(err => console.error(err))
    if (music && music.code === 1) {
      // console.log(EventBus.GET_LIST_SUCCESS(music))
      EventBus.GET_LIST_SUCCESS(music)
      EventBus.INIT_PLAYER()
    } else EventBus.GET_LIST_FAILURE()
  },

  async getMusicDetail ({ commit }, para = {}) {
    EventBus.REQUEST_SONG()
    const res = await service.getMusicDetail(para)
      .catch(err => console.error(err))
    if (res && res.code === 1) EventBus.GET_SONG_SUCCESS(res)
    else EventBus.GET_SONG_FAILURE()
  }
}

export default new Vuex.Store({
  actions,
  modules,
  strict: process.env.NODE_ENV !== 'production'
})
