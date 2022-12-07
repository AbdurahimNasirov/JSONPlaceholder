<template>
  <v-col md="3" class="amber darken-4 pr-0 fixed">
    <div style="overflow: auto; height: 100vh">
      <Search :users="getUsers" />
      <UserItem v-for="user in getUsers" :key="user.id" :user="user" />
    </div>
    <AddUser :show="show" />
  </v-col>
</template>

<script>
import Search from "@/components/app/Search.vue";
import AddUser from "@/components/auth/AddUser.vue";
import UserItem from "@/components/Users/Useritem.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Sidebar",
  data: () => ({
    show: false,
  }),
  computed: {
    ...mapGetters(["getUsers"]),
  },
  methods: {
    ...mapActions(["fetchUsers"]),
    showchanger() {
      this.show = !this.show;
    },
  },
  async mounted() {
    if (!this.getUsers.length) {
      await this.fetchUsers({
        url: this.$http.users,
        method: "get",
        data: null,
      });
    }
  },
  components: {
    UserItem,
    AddUser,
    Search,
  },
};
</script>

<style lang="scss" scoped>
</style>