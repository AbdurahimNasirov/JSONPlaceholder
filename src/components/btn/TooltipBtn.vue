<template>
  <v-tooltip top :color="`${color[goTo]}`">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        dark
        fab
        :color="`${color[goTo]}`"
        :class="`add-btn-${goTo.toLowerCase()}`"
        v-bind="attrs"
        v-on="on"
        @click.stop="action"
      >
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </template>
    <span>Add new {{ goTo }}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: ["goTo"],
  data: () => ({
    showDialog: false,
    color: {
      User: "indigo",
      Post: "cyan",
    },
  }),
  methods: {
    action() {
      this.showDialog = true;
      this.$emit("showDialog", this.showDialog);
    },
  },
  mounted() {
    console.log(this.goTo);
  },
};
</script>

<style lang="scss" scoped>
.add-btn-post {
  position: fixed !important;
  top: 90%;
  right: 3%;
}
.add-btn-user {
  position: fixed !important;
  bottom: 3%;
  left: 18%;
}
</style>