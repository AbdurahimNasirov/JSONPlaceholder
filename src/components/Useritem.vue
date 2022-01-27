<template>
  <div >
    <router-link class="black--text text--darken-4  px-3 py-1 d-block user--item" :class=" click ? 'click': click" :to="`/user/${user.id}`">
        <h4>{{ user.name }}</h4>
        <p class="size">{{ user.email}}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["user"],
  data:() => ({
      click: false
  })
};
</script>

<style lang="scss">
    .user--item:hover{
        background:rgba(0, 0, 0, 0.356);
    }
    .click {
        background:rgba(0, 0, 0, 0.356);
    }
    .size{
      color: rgba(2, 126, 209, 0.897);
      font-size: 12px;
      font-weight: 500;
      margin: 0 !important;
      margin-top: -2px !important;
    }
</style>