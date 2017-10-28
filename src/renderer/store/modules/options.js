/**
 * 
 * 网站信息
 * 
 */

import service from '@/api'

const state = {
  // 是否有侧栏
  isAsidePage: true,

  // 错误页面
  isError: false,

  // ua
  userAgent: '',

  // 博主信息
  adminInfo: {},

  // 网站信息
  option: {}
}

const mutations = {

  // 侧栏
  CHANGE_ASIDE_PAGE (state, data) {
    state.isAsidePage = data
  },

  // 设置UA
  SET_USER_AGENT (state, action) {
    state.userAgent = action
  },

  // 博主用户信息
  SET_ADMIN_INFO (state, data) {
    state.adminInfo = data
  },

  // 网站信息
  SET_WEB_OPTION (state, data) {
    state.option = data
  },

  // 错误页面
  SET_ERROR_PAGE (state, data) {
    state.isError = data
  }
}

const actions = {
  async getAdminInfo ({ commit }) {
    const res = await service.getAuth()
      .catch(err => console.error(err))
    commit('SET_ADMIN_INFO', res.result || {})
  },

  // 获取网站信息
  async getOpt ({ commit }) {
    const res = await service.getOpt()
      .catch(err => console.error(err))
    commit('SET_WEB_OPTION', res.result || {})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
