<template>
  <div>
    <div class="navigation">
        <div class="site-name">Gayddit</div>

        <ul class="main-nav">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/sad">kek</router-link></li>
            <li><router-link to="/sad">kek</router-link></li>
            <li><router-link to="/sad">kek</router-link></li>
            <li><router-link to="/sad">kek</router-link></li>
        </ul>


        <ul class="user-nav">
            <li v-if="token"><a @click="logout" href="#">Logout</a></li>
            <span v-else>
            <li><router-link to="/login">Login</router-link></li>
            <li><router-link to="/register">Register</router-link></li>
            </span>
        </ul>
    </div>

    <div class="navigation-fix"></div>
    
    <div class="container">
        <router-view></router-view>
    </div>
    <div class="sidebar">
        <form action="?" method="post">
            <h5>Create board</h5>
            <input v-model="boardName" type="text" placeholder="BoardName" class="full">
            <input v-model="boardMiniDescription" type="text" placeholder="Description" class="full">
            <textarea v-model="boardFullDescription" class="full"></textarea>
            <input @click="submitBoard()" value="Create" class="btn-default full submit">
        </form>
        <br>
        <form action="?" method="post">
            <h5>Submit post</h5>
            <input v-model="boardName" type="text" placeholder="Title" class="full">
            <textarea v-model="boardFullDescription" class="full"></textarea>
            <input @click="submitBoard()" value="Submit" class="btn-default full submit">
        </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
        boardName : "",
        boardMiniDescription : "",
        boardFullDescription : ""
    }
  },
  methods: {
      logout() {
          console.log("LOGGED OUT")
          this.$store.dispatch('logOut')
      },
      submitBoard() {
          let token = this.$store.getters.token
            this.$http.post('http://127.0.0.1:1337/board', {
                title: this.boardName,
                miniDesc: this.boardMiniDescription,
                fullDesc: this.boardFullDescription
            },{emulateJSON: true, headers: {token: token}}).then((response) => {
                console.log(response)
                response.json().then(data => {
                    console.log(data)
                })
            })
      },
      submitPost(post) {
          let token = this.$store.getters.token
      }
  },
  computed: {
    alert() {
      return this.$store.getters.alert
    },
    token() {
      return this.$store.getters.token
    }
  }
}
</script>

<style>

</style>
