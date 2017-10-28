/**
 * 
 * 文章数据状态
 * 
 */

import service from '@/api'

const state = {
  // 热门文章
  hotArt: {
    pagination: {},
    list: []
  },

  // 列表文章
  art: {
    pagination: {},
    list: []
  },

  fetch: false,

  // 文章详情
  details: {}
}

const mutations = {
  FETCH_ART (state) {
    state.fetch = true
  },

  SET_HOT_ART (state, data) {
    state.hotArt = data
  },

  SET_ART_SUCCESS (state, data) {
    state.art = data
    state.fetch = false
  },

  SET_ART_FAIL (state) {
    state.art = { pagination: {}, list: [] }
    state.fetch = false
  },

  SET_DETAILS (state, data) {
    state.details = data
  },

  ADD_COMMENT (state) {
    state.details.meta.comments += 1
  },

  LIKE_ARTICLE (state) {
    state.details.meta.likes += 1
    console.log(state.details)
  }
}

const actions = {
  // 获取文章
  async getArtList ({ commit, state }, data = { current_page: 1 }) {
    commit('FETCH_ART')
    const res = await service.getArts(data)
      .catch(err => console.error(err))
    if (res && res.code === 1) {
      let list
      if (res.result.pagination.current_page === 1) list = res.result.list
      else list = [...state.article.art.list, ...res.result.list]
      commit('SET_ART_SUCCESS', {
        list,
        pagination: res.result.pagination
      })
    } else commit('SET_ART_FAIL')
  },

  // 获取最热文章列表
  async getHotArt ({ commit }) {
    const res = await service.getArts({ hot: true })
      .catch(err => console.error(err))
    commit('SET_HOT_ART', res.result || { pagination: {}, list: [] })
  },

  // 文章详情
  async getArt ({ commit }, data) {
    const res = await service.getArt(data)
      .catch(err => console.error(err))
    commit('SET_DETAILS', res.result || {})
  },

  // 喜欢文章
  async likeArt ({ commit }, data) {
    const res = await service.likeArt({ ...data, type: 0 })
      .catch(err => console.error(err))
    if (res && res.code === 1) commit('LIKE_ARTICLE')
    return res
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
