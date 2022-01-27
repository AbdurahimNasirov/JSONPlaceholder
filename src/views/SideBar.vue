<template>
  <div>
    <Search :users="getUsers" />
    <UserItem v-for="user in getUsers" :key="user.id" :user="user" />
    <v-tooltip left color="indigo">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          dark
          v-bind="attrs"
          v-on="on"
          fab
          color="indigo"
          class="mx-2 absolute-add-btn"
          @click="showchanger()"
        >
          <v-icon dark color="white">mdi-plus</v-icon>
        </v-btn>
      </template>
      <span>Add new user</span>
    </v-tooltip>
    <AddUser :show="show" />
  </div>
</template>

<script>
import Search from "../components/app/Search.vue";
import AddUser from "../components/auth/AddUser.vue";
import UserItem from "../components/Useritem.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Sidebar",
  data: () => ({
    show: false,
    items: ["foo", "bar", "fizz", "buzz"],
    values: ["foo", "bar"],
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

<style lang="scss">
.absolute-add-btn {
  position: absolute !important;
  bottom: 6%;
  right: 5%;
}
</style>