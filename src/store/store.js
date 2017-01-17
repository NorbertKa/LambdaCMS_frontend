import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: "",
        myUser: {},
        users: [],
        boards: [],
        posts: [],
        comments: [],
        user: {},
        board: {},
        post: {},
        comment: {}
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
        },
        REMOVE_TOKEN(state) {
            state.token = ""
        },
        SET_MY_USER(state, user) {
            state.myUser = user
        },
        SET_USERS(state, users) {
            state.users = users
        },
        REMOVE_USERS(state){
            state.users = []
        },
        SET_BOARDS(state, boards){
            state.boards = boards
        },
        REMOVE_BOARDS(state){
            state.boards = []
        },
        SET_POSTS(state, posts) {
            state.posts = posts
        },
        REMOVE_POSTS(state){
            state.posts = []
        },
        SET_COMMENTS(state, comments){
            state.comments = comments
        },
        REMOVE_COMMENTS(state){
            state.comments = []
        },
        SET_USER(state, user){
            state.user = user
        },
        SET_BOARD(state, board){
            state.board = board
        },
        SET_COMMENT(state, comment){
            state.comment = comment
        }
    },
    actions: {
        logIn({commit}, token) {
            commit('SET_TOKEN', token)
        }
    },
    getters: {
        token: state => state.token
    }
})