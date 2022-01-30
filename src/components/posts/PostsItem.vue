<template>
  <div>
      <router-link :to="`${this.$route.params.userId}/post/${post.id}`">{{post.title}}</router-link>
      <p>{{post.body}}</p>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
<script>
export default {
  props: ["post"],
};
</script>

<style>
</style>