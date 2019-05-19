<template>
  <section class="container">
    <div class="mb-3">
      <div v-if="user === null">
        <button class="btn btn-light btn-block" tabindex="" @click="loginG"
          >Gmailでログイン</button>
      </div>

      <form v-if="user">
        <div class="form-group">
          <button class="btn btn-light btn-block" tabindex="" @click="logout"
          >ログアウト</button>
          <label>Name</label>
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">@</div>
            </div>
            <input v-model="user.name" type="text" class="form-control"  disabled/>
          </div>
        </div>
        <div class="form-group">
          <label>Comment</label>
          <textarea v-model="form.comment" class="form-control" rows="3" />
        </div>
        <div class="form-group">
          <a class="btn btn-light btn-block" tabindex="" @click="submitPost"
            >投稿</a
          >
        </div>
      </form>
    </div>

    <div class="list-group list-group-flush">
      <div
        v-for="(post, index) in posts"
        :key="index"
        class="list-group-item list-group-item-action flex-column align-items-start"
      >
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{ post.user }}</h5>
          <small>{{ post.date }}</small>
        </div>
        <p class="mb-1">{{ post.comment }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data(){
    return {
      form: {
        comment: ""
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    posts() {
      return [...this.$store.state.posts].reverse()
    }
  },
  async mounted() {
    this.$store.dispatch("INIT_POSTS")
    await this.$store.dispatch("INIT_USERS")
  },
  methods: {
    loginG(){
      // console.log("login")
      this.$store.dispatch("loginWithUserName")

      // const provider = new firebase.auth.GoogleAuthProvider()
      // firebase.auth().signInWithRedirect(provider)
    },
    submitPost() {
      if (this.form.comment === "") {
        return false
      }
      this.$store.dispatch("addComments",this.form.comment)
      this.form.comment = ""
    },
    logout() {
      firebase.auth().signOut()
    }
  }
}
</script>
