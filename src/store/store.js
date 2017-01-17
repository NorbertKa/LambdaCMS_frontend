import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4)
            callback(xmlHttp.responseText, xmlHttp.status);
    }
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send(null);
}

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
        },
        getBoards({commit}) {
            httpGetAsync("http://127.0.0.1:1337/boards", function(resp, statusCode){
                if(statusCode == 200){
                    var data = JSON.parse(resp)
                    console.log(data.Boards)
                    commit('SET_BOARDS', data.Boards)
                }
            })
        }
    },
    getters: {
        token: state => state.token,
        boards: state => state.boards,
    }
})