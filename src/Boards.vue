<template>
  <div id="app">
    <router-view></router-view>
    <router-link to="/sad">kek</router-link>
    <h1>{{ msg }}</h1>
    <h2 @click="logInToken('kek')">Token is : {{ token }} </h2>
    <input
    @input="loginTokenEvent"
    :value="token" />
    <button @click="getBoards()">GET BOARDS</button>
    <input
    v-model = "username"
    />
    <input
    v-model = "password"
    />
    <p> Username: {{ username }} </p>
    <p> Password : {{ password }} </p>
    <button @click="register()">REGISTER</button>
    <button @click="login()">LOGIN</button>
    <div id="boards">
      <h3 v-if="boards.length == 0">No Boards found</h3>
      <div v-for="board in boards">
        <h1>{{board.title}}</h1>
        <small>{{board.miniDescription}}</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to LambdaCMS',
      username: "",
      password: "",
    }
  },
  methods: {
    setUsername(e){
      this.$store.dispatch('setUsername',e.target.value)
    },
    setPassword(e){
      this.$store.dispatch('setPassword',e.target.value)
    },
    loginTokenEvent(e){
      this.$store.dispatch('logIn', e.target.value)
    },
    logInToken(token){
      console.log(token)
      this.$store.dispatch('logIn', token)
    },
    getBoards(){
      this.$store.dispatch('getBoards')
    },
    register(){
      this.$store.dispatch('register', {username: this.username, password: this.password})
    },
    login(){
      this.$store.dispatch('login', {username: 'flatbutter', password: 'amxmodx123'})
    }
  },
  computed: {
    token() {
      console.log("SOMETHING")
      return this.$store.getters.token
    },
    boards() {
      return this.$store.getters.boards
    }
  }
}
</script>

<style>

</style>
