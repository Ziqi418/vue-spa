import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);  // vuex serves as a central state management

export default new Vuex.Store({
  state: {
    recipes: [],
    apiUrl: "https://api.edamam.com/search"
  },
  mutations: {  // mutations are where actions actually take place
    setRecipes(state, payload) {
      state.recipes = payload;
    }
  },
  actions: {
    async getRecipes({ state, commit }, plan) {  // understand what async/await mean
      try {
        let response = await axios.get(`${state.apiUrl}`, {
          params: {
            q: plan,
            app_id: "<yourAppIdHere>",
            app_key: "<yourAppKeyHere>",
            from: 0,
            to: 9
          }
        });
        commit("setRecipes", response.data.hits);  // the commit function calls a mutation
      } catch (error) {
        commit("setRecipes", []);
      }
    }
  }
});
