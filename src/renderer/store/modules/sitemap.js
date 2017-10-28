/**
 * 网站地图
 */

import service from '@/api'

const state = {
  art: {
    list: [],
    pagination: {}
  },

  fetch: false
}

const mutations = {
  FETCH_ART (state) {
    state.fetch = true
  },

  SET_ART_SUCCESS (state, data) {
    state.art = data
    state.fetch = false
  },

  SET_ART_FAIL (state) {
    state.art = { pagination: {}, list: [] }
    state.fetch = false
  }
}

const actions = {
  // 全部文章列表 sitemap
  async getSitemap ({ commit }, data = { current_page: 1 }) {
    commit('FETCH_ART')
    const res = await service.getArts(data)
      .catch(err => console.error(err))
    if (res && res.code === 1) commit('SET_ART_SUCCESS', res.result)
    else commit('SET_ART_FILE')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
