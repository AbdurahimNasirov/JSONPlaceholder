<template>
  <div>
    <input
      list="brow"
      placeholder="Seatch User..."
      class="search-input"
      @change="mapRoute($event.target.value)"
      v-model="input"
    />
    <datalist id="brow">
      <option :value="user.name" v-for="user in users" :key="user.id" class="search-option">
        {{ user.email }}
      </option>
    </datalist>
  </div>
</template>

<script>
export default {
  props: ["users"],
  data: () => ({
    input: "",
  }),
  methods: {
    mapRoute(name) {
      let id = null;
      this.users.find((user) =>
        user.name === name ? (id = user.id) : (id = null)
      );
      let path = `/user/${id}`;
      if (this.$route.fullPath != path) {
        this.$router.push(path);
      }
      this.input = "";
    },
  },
};
</script>

<style lang="scss">
.search-input {
  width: 100%;
  padding: 5px 10px;
  border-bottom: 2px solid rgb(70, 68, 68);
  &:focus {
    outline: none;
    border-bottom: 2px solid rgb(70, 68, 68);
  }
  &::placeholder {
    color: black;
  }
}


</style>