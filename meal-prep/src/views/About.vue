<template>
  <v-container fluid>
    <v-layout>
      <h1>About Page</h1>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "About",
  computed: {
    userRecipes() {
      return this.$store.state.userRecipes;
    },
  },
  mounted() {
    this.getRecipes(); // this method is called when the view loads
  },
  methods: {
    getRecipes() {
      this.$store.dispatch("getUserRecipes");
    },
  },
};
</script>

<style scoped></style>
