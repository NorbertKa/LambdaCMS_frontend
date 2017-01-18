import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Base from './Base.vue'
import Login from "./Login.vue"
import Posts from "./Posts.vue"
import Comments from "./Comments.vue"
import Kek from "./Kek.vue"
import store from './store/store'

var VueResource = require('vue-resource');

Vue.use(VueResource);

function requireAuth (to, from, next) {
  console.log("CLICKED")
  console.log(to)
  console.log(from)
  next()
}

function loadComments(to, from, next) {
  console.log(to.params.id)
  store.dispatch('getComments',to.params.id)
  next()
}

function loadPosts(to, from, next) {
  store.dispatch('getPosts')
  next()
}

function loadPostsId(to, from, next) {
  store.dispatch('getPostsFromBoard', to.params.id)
  next()
}

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Posts, beforeEnter: loadPosts },
    { path: '/b/:id', component: Posts, beforeEnter: loadPostsId},
    { path: '/post/:id', component: Comments, beforeEnter: loadComments},
    { path: '/sad', component: Kek, beforeEnter: requireAuth  },
    { path: '/login', component: Login }
  ]
})

router.beforeEach(function(to, from, next) {
  let token = localStorage.getItem("token")
  if (token != "") {
    store.dispatch('logIn', token)
  }
  next()
})

global.router = router

import { sync } from 'vuex-router-sync'

sync(store, router)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(Base)
})
