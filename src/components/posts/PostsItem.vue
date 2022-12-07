<template>
  <div>
    <router-link
      :to="`/user/${$route.params.userId}/post/${post.id}`"
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