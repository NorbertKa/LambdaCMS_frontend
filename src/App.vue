<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <h2 @click="logInToken('kek')">Token is : {{ token }} </h2>
    <input
    @input="loginTokenEvent"
    :value="token" />
    <button @click="getBoards()">GET BOARDS</button>
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
      msg: 'Welcome to LambdaCMS'
    }
  },
  methods: {
    loginTokenEvent(e){
      this.$store.dispatch('logIn', e.target.value)
    },
    logInToken(token){
      console.log(token)
      this.$store.dispatch('logIn', token)
    },
    getBoards(){
      this.$store.dispatch('getBoards')
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
