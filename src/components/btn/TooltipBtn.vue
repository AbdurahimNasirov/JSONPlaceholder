<template>
  <v-tooltip top color="indigo">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        dark
        fab
        color="indigo"
        :class="`add-btn-${toWhere.toLowerCase()}`"
        v-bind="attrs"
        v-on="on"
        @click.stop="action"
      >
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </template>
    <span>Add new {{ toWhere }}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: ["toWhere"],
  data: () => ({
    showDialog: false,
  }),
  methods: {
    action() {
      this.showDialog = true;
      this.$emit("showDialog", this.showDialog);
    },
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