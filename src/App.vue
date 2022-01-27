<template>
  <div id="app">
    <v-app id="inspire">
      <v-row>
        <v-col md="3" class="amber darken-4 pr-0 fixed">
          <SideBar />
        </v-col>
        <v-col md="9" class="space">
          <router-view />
        </v-col>
      </v-row>
    </v-app>
  </div>
</template>
<script>
import SideBar from "./views/SideBar.vue";
export default {
  components: {
    SideBar,
  },
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  text-decoration: none;
}
.fixed {
  position: fixed;
  min-height: 105vh !important;
}
.space {
  margin-left: auto;
}
</style>
