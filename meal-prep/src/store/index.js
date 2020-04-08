import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import firebase from "firebase";
import router from "@/router";

Vue.use(Vuex); // vuex serves as a central state management

export default new Vuex.Store({
  state: {
    recipes: [],
    apiUrl: "https://api.edamam.com/search",
    user: null,
    isAuthenticated: false,
  },
  getters: {
    isAuthenticated(state) {
      return state.user !== null && state.user !== undefined; // getters look like computed properties for stores
    },
  },
  mutations: {
    // mutations are where actions actually take place
    setRecipes(state, payload) {
      state.recipes = payload; // input arguments are called payload, state should also be passed to the function
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setIsAuthenticated(state, payload) {
      state.isAuthenticated = payload;
    },
  },
  actions: {
    async getRecipes({ state, commit }, plan) {
      // understand what async/await mean
      try {
        let response = await axios.get(`${state.apiUrl}`, {
          params: {
            q: plan,
            app_id: "f5f01b25",
            app_key: "812de5771186d25d92b1b76dadc86f2f",
            from: 0,
            to: 9,
          },
        });
        commit("setRecipes", response.data.hits); // the commit function calls a mutation
      } catch (error) {
        commit("setRecipes", []);
      }
    },
    userJoin({ commit }, { email, password }) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          commit("setUser", user);
          commit("setIsAuthenticated", true);
          router.push("/about");
        })
        .catch(() => {
          commit("setUser", null);
          commit("setIsAuthenticated", false);
          router.push("/");
        });
    },
    userLogin({ commit }, { email, password }) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          commit("setUser", user);
          commit("setIsAuthenticated", true);
          router.push("/about");
        })
        .catch(() => {
          commit("setUser", null);
          commit("setIsAuthenticated", false);
          router.push("/");
        });
    },

    userSignOut({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit("setUser", null);
          commit("setIsAuthenticated", false);
          router.push("/");
        })
        .catch(() => {
          commit("setUser", null);
          commit("setIsAuthenticated", false);
          router.push("/");
        });
    },
    addRecipe({ state }, payload) {
      firebase
        .database()
        .ref("users")
        .child(state.user.user.uid)
        .push({ recipe: payload.recipe.label });
      console.log("hey it's wrong");
    },
  },
});
