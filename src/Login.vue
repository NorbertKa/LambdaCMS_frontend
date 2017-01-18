<template>
  <div id="login">
      <form>
            <h5>Login</h5>
            <h3 v-if="loginAlert"> {{ loginAlert }} </h3>
            <input v-model="username" type="text" placeholder="Username" class="full">
            <input v-model="password" type="password" placeholder="********" class="full">
            <input @click="login()"value="Login" class="full submit">
        </form>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      username: "",
      password: "",
    }
  },
  methods: {
    login(e){
        this.$store.dispatch('login', {username: this.username, password: this.password})
        .then(response => {
            response.json().then(data => {
                console.log(data)
            })
        })
    }
  },
  computed: {
    token() {
      return this.$store.getters.token
    },
    loginAlert() {
        return this.$store.getters.loginAlert
    }
  }
}
</script>

<style>

</style>
