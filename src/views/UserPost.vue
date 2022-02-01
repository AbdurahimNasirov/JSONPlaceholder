<template>
  <div>
    <h2>{{ user }}</h2>
    <input
      type="search"
      @input="filterPost"
      v-model="filter"
      class="search-post"
      placeholder="Search post.."
    />
    <PostItem v-for="post in post" :key="post.id" :post="post" />
    <AddPost />
  </div>
</template>

<script>
import AddPost from "@/components/auth/AddPost.vue";
import PostItem from "@/components/posts/PostsItem.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["getPosts", "getUsers"]),
  },
  data: () => ({
    posts: [],
    user: null,
    filter: "",
    post: [],
  }),
  async mounted() {
    await this.filterPosts(+this.$route.params.userId);
    this.post = this.posts;
  },
  methods: {
    ...mapActions(["fetchPosts"]),
    async filterPosts(id) {
      await this.fetchPosts({
        url: this.$http.post,
        methods: "get",
        data: null,
      });
      this.posts = this.getPosts.filter((post) => post.userId === id);
      this.getUsers.forEach((user) => {
        if (user.id === id) {
          this.user = user.name;
        }
      });
      this.post = this.posts;
    },
    filterPost() {
      this.post = [];
      this.posts.forEach((post) => {
        if (
          post.title
            .split(" ")
            .join("")
            .includes(this.filter.split(" ").join("")) ||
          post.body
            .split(" ")
            .join("")
            .includes(this.filter.split(" ").join(""))
        ) {
          this.post.push(post);
        }
      });
    },
  },
  watch: {
    "$route.params.userId": async function () {
      await this.filterPosts(+this.$route.params.userId);
      this.filter = "";
    },
  },
  components: {
    PostItem,
    AddPost,
  },
};
</script>

<style lang="scss">
.search-post {
  position: fixed;
  border: 2px solid rgb(77, 74, 74);
  right: 20px;
  top: 10px;
  width: 250px;
  background: rgb(77, 74, 74);
  padding: 2px 5px;
  color: white;
  font-weight: 500;
  font-size: 18px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: rgba(255, 255, 255, 0.61);
    font-weight: 400;
  }
}
</style>