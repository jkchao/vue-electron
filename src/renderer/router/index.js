import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

const home = () => import(/* webpackChunkName: "home" */ '../pages/index')

const code = () => import(/* webpackChunkName: "code" */ '../pages/code')

const think = () => import(/* webpackChunkName: "think" */ '../pages/think')

const tag = () => import(/* webpackChunkName: "tag" */ '../pages/tag/_tag')

const about = () => import(/* webpackChunkName: "about" */ '../pages/about')

const wall = () => import(/* webpackChunkName: "wall" */ '../pages/wall')

const sitemap = () => import(/* webpackChunkName: "sitemap" */ '../pages/sitemap')

const download = () => import(/* webpackChunkName: "download" */ '../pages/download')

const search = () => import(/* webpackChunkName: "search" */ '../pages/search/_keyword')

const date = () => import(/* webpackChunkName: "date" */ '../pages/date/_date')

const article = () => import(/* webpackChunkName: "article" */ '../pages/article/_id')

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: home,
    name: 'index'
  },
  {
    path: '/code',
    component: code,
    name: 'code'
  },
  {
    path: '/think',
    component: think,
    name: 'think'
  },
  {
    path: '/about',
    component: about,
    name: 'about'
  },
  {
    path: '/wall',
    component: wall,
    name: 'wall'
  },
  {
    path: '/download',
    component: download,
    name: 'download'
  },
  {
    path: '/sitemap',
    component: sitemap,
    name: 'sitemap'
  },
  {
    path: '/tag/:tag',
    component: tag,
    name: 'tag'
  },
  {
    path: '/search/:keyword',
    component: search,
    name: 'search'
  },
  {
    path: '/date/:date',
    component: date,
    name: 'date'
  },
  {
    path: '/article/:id',
    component: article,
    name: 'article'
  }
]

const router = new Router({
  linkExactActiveClass: 'link-active',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes
})

const isSide = ['index', 'code', 'think', 'date', 'tag', 'search', 'sitemap']

router.beforeEach((to, from, next) => {
  const isAsidePage = isSide.includes(to.name)
  if (!Object.is(store.state.options.isAsidePage, isAsidePage)) {
    store.commit('options/CHANGE_ASIDE_PAGE', isAsidePage)
  }
  next()
})

router.afterEach(transition => {})

export default router
