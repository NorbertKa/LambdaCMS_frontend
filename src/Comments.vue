<template>
  <div id="app">
      <div v-for="c in comments">
        <div class="comment">
            <div class="comment-vote">
                <a href="#" v-on:click="upvote(c)" class="vote-btn vote-up"><i class="fa fa-arrow-up"></i></a>
                <span class="vote-count">{{c.upvotes - c.downvotes}}</span>
                <a href="#" v-on:click="downvote(c)" class="vote-btn vote-down"><i class="fa fa-arrow-down"></i></a>
            </div>

            <div class="comment-info">
                <a href="#">{{c.user.username}}</a>
                <span>{{c.posted}}</span>
                <span>Upvotes: {{c.upvotes}}</span>
                <span>Downvotes: {{c.downvotes}}</span>
            </div>

            <div class="comment-content">
                {{c.body}}
            </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {}
  },
  methods: {
    upvote(e){
      console.log(e)
      let token = this.$store.getters.token
      this.$http.get('http://127.0.0.1:1337/comment/' + e.id + "/upvote",
      {headers: {"token" : token}}
      ).then(response => {
        response.json().then(data => {
            console.log(data)
            if(data.Response.status != false){
                e.upvotes++
            }
        })
    })
    },
    downvote(e) {
        console.log(e)
      let token = this.$store.getters.token
      this.$http.get('http://127.0.0.1:1337/comment/' + e.id + "/downvote",
      {headers: {"token" : token}}
      ).then(response => {
        response.json().then(data => {
            console.log(data)
            console.log(data.Response)
            if(data.Response.status != false){
                e.downvotes++
            }
        })
    })
    }
  },
  computed: {
    comments() {
      return this.$store.getters.comments
    }
  }
}
</script>

<style>

</style>
