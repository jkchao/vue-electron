/**
 * 标签
 */

import service from '@/api'

const state = {
  data: {}
}

const mutations = {
  SET_TAG (state, data) {
    state.data = data
  }
}

const actions = {
  // 获取标签
  async getTag ({ commit }) {
    const res = await service.getTag({ page_size: 100 })
      .catch(err => console.error(err))
    commit('SET_TAG', res.result || { pagination: {}, list: [] })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
