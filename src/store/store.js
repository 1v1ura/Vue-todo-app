import Vue from "vue";
import Vuex from "vuex";
import task from "./modules/task";
import tag from "./modules/tag";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    task,
    tag
  }
});
