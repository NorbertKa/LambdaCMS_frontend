import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        alert: "",
        loginAlert: "",
        username: "",
        password: "",
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
        SET_ALERT(state, alert) {
            state.alert = alert
        },
        SET_LOGIN_ALERT(state, alert){
            state.loginAlert = alert
        },
        SET_USERNAME(state, username){
            state.username = username;
        },
        REMOVE_USERNAME(state){
            state.username = ""
        },
        SET_PASSWORD(state, password){
            state.password = password;
        },
        REMOVE_PASSWORD(state){
            state.password = ""
        },
        SET_TOKEN(state, token) {
            state.token = token
        },
        REMOVE_TOKEN(state) {
            state.token = "empty"
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
        setUsername({commit}, username) {
            commit('SET_USERNAME', username)
        },
        setPassword({commit}, password) {
            commit('SET_PASSWORD', password)
        },
        logIn({commit}, token) {
            commit('SET_TOKEN', token)
        },
        logOut({commit}) {
            commit('REMOVE_TOKEN')
            localStorage.removeItem("token")
        },
        getBoards({commit}) {
            Vue.http.get('http://127.0.0.1:1337/boards')
            .then(response => {
                response.json().then(data => {
                    commit('SET_BOARDS', data.Boards)
                })
            })
        },
        getComments({commit}, id){
            Vue.http.get('http://127.0.0.1:1337/post/' + id + '/comments')
                .then(response => {
                    response.json().then(data => {
                        let comments = data.Comments
                        comments.forEach(function(value, index){
                            comments[index].user = {}
                            Vue.http.get('http://127.0.0.1:1337/user/' + value.userId)
                            .then(response => {
                                response.json().then(data => {
                                    comments[index].user = data.user
                                })
                            })
                        })
                        commit('SET_COMMENTS', comments)
                    })
                })
        },
        getPosts({commit}) {
            Vue.http.get('http://127.0.0.1:1337/posts')
            .then(response => {
                response.json().then(data => {
                    let posts = data.Posts
                    posts.forEach(function(value, number){
                        posts[number].user = {}
                        posts[number].board = {}
                        posts[number].comments = []
                        Vue.http.get('http://127.0.0.1:1337/user/' + value.userId)
                        .then(response => {
                            response.json().then(data => {
                                posts[number].user = data.user
                            })
                        })
                        Vue.http.get('http://127.0.0.1:1337/board/' + value.boardId)
                        .then(response => {
                            response.json().then(data => {
                                posts[number].board = data.board
                            })
                        })
                    })
                    commit('SET_POSTS', posts)
                })
            })
        },
        getPostsFromBoard({commit}, id){
            Vue.http.get('http://127.0.0.1:1337/board/' + id + '/posts')
                    .then(response => {
                        response.json().then(data => {
                            let posts = data.Posts
                            let counter = 0
                            posts.forEach(function(value, number){
                                posts[number].user = {}
                                posts[number].board = {}
                                posts[number].comments = []
                                Vue.http.get('http://127.0.0.1:1337/user/' + value.userId)
                                .then(response => {
                                    response.json().then(data => {
                                        posts[number].user = data.user
                                        counter++
                                    })
                                })
                                Vue.http.get('http://127.0.0.1:1337/board/' + value.boardId)
                                .then(response => {
                                    response.json().then(data => {
                                        posts[number].board = data.board
                                        counter++
                                    })
                                })
                            })
                            commit('SET_POSTS', posts)
                        })
                    })
        },
        register({commit}, data) {
            console.log(data)
            Vue.http.post('http://127.0.0.1:1337/user', {
                username: data.username,
                password: data.password,
            },{emulateJSON: true}).then((response) => {
                console.log(response)
                response.json().then(data => {
                    console.log(data)
                })
            })
        },
        login({commit}, data) {
            Vue.http.post('http://127.0.0.1:1337/login', {
                username: data.username,
                password: data.password,
            },{emulateJSON: true}).then((response) => {
                console.log(response)
                response.json().then(data => {
                    if (data.status == false) {
                        commit('SET_LOGIN_ALERT', data.message)
                        return
                    }
                    localStorage.setItem("token", data.token)
                    commit('SET_TOKEN', data.token)
                    commit('SET_LOGIN_ALERT', "Logged in")
                    router.push('/')
                })
            })
        }
    },
    getters: {
        token: state => state.token,
        boards: state => state.boards,
        posts: state => state.posts,
        username: state => state.username,
        password: state => state.password,
        alert: state => state.alert,
        loginAlert: state => state.loginAlert,
        comments: state => state.comments
    }
})