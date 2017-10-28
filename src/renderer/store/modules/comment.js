/*
*
* 评论数据状态
*
*/

import service from '@/api'

const state = {
  fetching: false,
  posting: false,
  data: {
    data: [],
    pagination: {}
  }
}

const mutations = {
  // 获取评论
  REQUEST_LIST (state) {
    state.fetching = true
  },

  // 清空评论
  CLEAR_LIST (state) {
    state.data = {
      data: [],
      pagination: {}
    }
  },

  GET_LIST_SUCCESS (state, action) {
    state.fetching = false
    state.data = action.result
  },

  GET_LIST_FAILURE (state) {
    state.fetching = false
    state.data = {
      data: [],
      pagination: {}
    }
  },

  // 发布评论
  POST_ITEM (state) {
    state.posting = true
  },

  POST_ITEM_SUCCESS (state, action) {
    state.posting = false
    state.data.pagination.total += 1
    state.data.data.push(action.result)
  },

  POST_ITEM_FAILURE (state) {
    state.posting = false
  },

  // 喜欢某条评论
  LIKE_ITEM (state, action) {
    const comment = state.data.data.find(comment => Object.is(comment._id, action._id))
    if (comment) comment.likes++
  }
}

const actions = {
  // 根据post-id获取评论列表
  async loadCommentsByPostId ({ commit }, data) {
    data.sort = data.sort || -1
    data.current_page = data.current_page || 1
    data.page_size = data.page_size || 20
    if (Object.is(data.current_page, 1)) {
      // commit('CLEAR_LIST')
    }
    commit('REQUEST_LIST')
    const res = await service.getComment(data)
      .catch(err => console.error(err))
    if (res && res.code === 1) {
      if (Object.is(data.sort, -1)) res.result.data.reverse()
      commit('GET_LIST_SUCCESS', res)
    } else commit('GET_LIST_FAILURE')
    return res
  },

  // 发布评论
  async postComment ({ commit }, comment) {
    commit('POST_ITEM')
    const res = await service.postComment(comment)
      .catch(err => console.error(err))
    if (res && res.code === 1) {
      commit('POST_ITEM_SUCCESS', res)
      commit('article/ADD_COMMENT', null, { root: true })
    } else commit('POST_ITEM_FAILURE')
    return res
  },

  // 为某条回复点赞
  async likeComment ({ commit }, data) {
    const res = await service.likeComment(data)
      .catch(err => console.error(err))
    if (res && res.code === 1) commit('LIKE_ITEM', data)
    return res
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
