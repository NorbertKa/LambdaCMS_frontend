<template>
  <div id="app">
      <div v-for="p in posts">
        <div class="post">
            <div class="post-vote">
                <a href="#" v-on:click="upvote(p)" class="vote-btn vote-up"><i class="fa fa-arrow-up"></i></a>
                <span class="vote-count">{{p.upvotes - p.downvotes}}</span>
                <a href="#" v-on:click="downvote(p)" class="vote-btn vote-down"><i class="fa fa-arrow-down"></i></a>
            </div>

            <div class="post-img">
                <img v-bind:src="p.board.image" alt="Img name">
            </div>

            <div class="post-title">
                <h5><a v-on:click="toPost(p)" href="#">{{p.title}}</a></h5>
            </div>

            <div class="post-info">
                <span>Submitted {{p.posted}} hours ago by <a href="?author">{{p.user.username}}</a> in <a href="#" v-on:click="changeBoard(p)">/b/{{p.board.title}}</a></span>
                <span>Upvotes: {{p.upvotes}} Downvotes: {{p.downvotes}}</span> 
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
    toPost(e){
        this.$store.dispatch('setSelectedPost', e.id)
        this.$router.push('/post/' + e.id)
    },
    changeBoard(e){
        this.$store.dispatch('setSelectedBoard', e.board.id)
        this.$store.dispatch('getPostsFromBoard', e.board.id)
    },
    getPosts(){
      this.$store.dispatch('getPosts')
    },
    upvote(e){
      console.log(e)
      let token = this.$store.getters.token
      this.$http.get('http://127.0.0.1:1337/post/' + e.id + "/upvote",
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
      this.$http.get('http://127.0.0.1:1337/post/' + e.id + "/downvote",
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
    posts() {
      return this.$store.getters.posts
    }
  }
}
</script>

<style>

</style>
