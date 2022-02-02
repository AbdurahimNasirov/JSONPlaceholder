<template>
  <v-app id="inspire">
    <v-row justify="center" class="amber darken-4 absolute">
      <TooltipBtn :goTo="goTo" @showDialog="changeShowDialog" />
      <v-dialog v-model="showDialog" max-width="500">
        <v-card class="px-5 py-1">
          <UserForm
            v-if="goTo === 'User'"
            @closeDialog="closeShowDialog"
            :addWhat="goTo"
          />
          <PostForm
            v-if="goTo === 'Post'"
            @closeDialog="closeShowDialog"
            :addWhat="goTo"
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
  props: ["goTo"],
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