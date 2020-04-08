<template>
  <span>
    <v-navigation-drawer
      app
      v-model="drawer"
      class="brown lighten-2"
      dark
      disable-resize-watcher
    >
      <!--"app" prop for automatic adjusting-->
      <v-list>
        <template v-for="(item, index) in items">
          <v-list-item :key="index">
            <v-list-item-content>
              {{ item.title }}
            </v-list-item-content>
          </v-list-item>
          <v-divider :key="`divider-${index}`"></v-divider>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app color="brown darken-4" dark>
      <!--v-toolbar for medium and large screens-->
      <v-toolbar-side-icon
        class="hidden-md-and-up"
        @click="drawer = !drawer"
      ></v-toolbar-side-icon>
      <v-spacer class="hidden-md-and-up"></v-spacer>
      <router-link to="/">
        <!--make the app title clickable even though it is not a button-->
        <v-toolbar-title to="/">{{ appTitle }}</v-toolbar-title>
      </router-link>
      <v-btn flat class="hidden-sm-and-down" to="/menu">Menu</v-btn>
      <v-spacer class="hidden-sm-and-down"></v-spacer>
      <div v-if="!isAuthenticated" class="hidden-sm-and-down">
        <v-btn flat to="/signin">SIGN IN</v-btn>
        <v-btn color="brown lighten-3" to="/join">JOIN</v-btn>
      </div>
      <v-btn v-else outlined @click="logout">LOGOUT</v-btn>
    </v-toolbar>
  </span>
</template>

<script>
export default {
  name: "AppNavigation",
  data() {
    return {
      appTitle: "Meal Prep",
      drawer: false,
      items: [{ title: "Menu" }, { title: "Sign In" }, { title: "Join" }],
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("userSignOut");
    }
  },
};
</script>

<style scoped>
a {
  color: white;
  text-decoration: none;
}
</style>
