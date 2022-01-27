<template>
  <div v-if="post" class="post-item">
    <button type="button" class="absolute-delete-btn-post" @click="delPost()">
      <v-icon dark>mdi-delete</v-icon>
    </button>
    <input
      type="text"
      class="blue--text blue-lighten-1 d-block post-title"
      :value="post.title"
      id="title"
      @blur="updatePostTitle"
    />
    <textarea
      name=""
      cols="30"
      rows="10"
      :value="post.body"
      class="resize"
      id="body"
      @blur="updatePostBody"
    ></textarea>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["getPosts"]),
  },
  data: () => ({
    post: null,
    examPost: ''
  }),
  async mounted() {
    if (!this.getPosts.length)
      await this.fetchPosts({
        url: this.$http.post,
        method: "get",
        data: null,
      });
    this.post = this.getPosts.find(
      (post) => post.id === +this.$route.params.postId
    );
    // this.post = this.post[0];

    if (!this.post) {
      this.$router.push({
        name: 'User',
        params: {
          userId: this.$route.params.userId
        }
      })
    }
    
    this.examPost = JSON.stringify(this.post)
  },
  methods: {
    ...mapActions(["fetchPosts", "updataPost", "deletePost"]),
    async updatePostTitle() {
      const data = JSON.parse(JSON.stringify(this.post))
      data.title = event.target.value
      this.updatePost(data)
    },
    async updatePostBody() {
      const data = JSON.parse(JSON.stringify(this.post))
      data.body = event.target.value
      this.updatePost(data)
    },
    async updatePost (data){
      // исправь это дублирование, не знаю от куда оно у тебя пришло
      if(this.examPost !== JSON.stringify(data)) {
        await this.updataPost({
          url: `${this.$http.post}/${this.$route.params.postId}`,
          method: "put",
          data,
        });
        for (const key in data) {
          if (Object.hasOwnProperty.call(data, key)) {
            const element = data[key];
            if (this.post[key] !== element) {
              this.$set(this.post, key, element)
            }
          }
        }
        this.examPost = JSON.stringify(data)
      }
    },
    async delPost() {
      // что за ерунда:)
      // ничего не понял))))
      // udalit i route i page 
      // нужно что бы после удаления перекидывало в роут?
      // все?
      await this.deletePost({
        url: `${this.$http.post}/${this.$route.params.postId}`,
        method: "delete",
        data: null,
      });
      this.$router.push({
        name: 'User',
        params: {
          userId: this.$route.params.userId
        }
      })
    },
  },
};
</script>

<style lang="scss">
.post-title {
  width: 100% !important;
  font-size: 24px;
  &:focus {
    border: none;
    outline: none;
  }
}
.resize {
  width: 100%;
  min-height: 100vh;
  resize: none !important;
  overflow: none;
  &:focus {
    border: none;
    outline: none;
  }
}
.absolute-delete-btn-post {
  position: fixed !important;
  top: 2%;
  right: 2%;
  padding: 10px;
  background: red;
  border-radius: 50%;
}
</style>