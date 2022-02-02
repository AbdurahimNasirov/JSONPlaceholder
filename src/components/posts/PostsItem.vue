<template>
  <div>
    <router-link
      :to="{
        name: 'Post',
        params: { userId: $route.params.userId, postId: post.id },
        component: () => import('@/views/Post.vue'),
      }"
      >{{ post.title }}</router-link
    >
    <p>{{ post.body }}</p>
  </div>
</template>

<script>
export default {};
</script>

<script>
export default {
  props: ["post"],
};
</script>

<style lang="scss" scoped>
</style>