<template>
  <v-app id="inspire">
    <v-row justify="center" class="amber darken-4 absolute">
      <TooltipBtn :toWhere="toWhere" @showDialog="changeShowDialog" />
      <v-dialog v-model="showDialog" max-width="500">
        <v-card class="px-5 py-1">
          <UserForm
            v-if="toWhere === 'User'"
            @closeDialog="closeShowDialog"
            :addWhat="toWhere"
          />
          <PostForm
            v-if="toWhere === 'Post'"
            @closeDialog="closeShowDialog"
            :addWhat="toWhere"
          />
        </v-card>
      </v-dialog>
    </v-row>
  </v-app>
</template>

<script>
import TooltipBtn from "@/components/btn/TooltipBtn.vue";
import UserForm from "@/components/forms/AddUserForm.vue";
import PostForm from "@/components/forms/AddPostForm.vue";
export default {
  props: ["toWhere"],
  data: () => ({
    showDialog: false,
  }),
  methods: {
    changeShowDialog(el) {
      if (el) this.showDialog = true;
    },
    closeShowDialog(el) {
      this.showDialog = el;
    },
  },
  components: {
    TooltipBtn,
    UserForm,
    PostForm,
  },
};
</script>
<style lang="scss" scoped>
.absolute {
  position: absolute !important;
}
</style>