<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <h2 @click="logInToken('kek')">Token is : {{ token }} </h2>
    <input
    @input="loginTokenEvent"
    :value="token" />
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
    }
  },
  computed: {
    token() {
      console.log("SOMETHING")
      return this.$store.getters.token
    }
  }
}
</script>

<style>

</style>
