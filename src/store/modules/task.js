const task = {
  namespaced: true,
  state: {
    tasks: [
      { id: 1, name: "hoge", done: true, tags: [1,2] },
      { id: 2, name: "fuga", done: true, tags: [1,3] },
      { id: 3, name: "piyo", done: false,  tags: [1] }
    ]
  },
  mutations: {
    updateTaskName(state, { id, name }) {
      const target = state.tasks.find(task => task.id === id);
      if (target) {
        target.name = name;
      }
    },
    changeCheck(state,  { id, done }) {
      const target = state.tasks.find(task => task.id === id);
      if (target) {
        target.done = done;
      }
    }
  },
  actions: {
    updateTaskName({ commit }, payload) {
      commit("updateTaskName", payload);
    },
    changeCheck({ commit }, payload) {
      commit("changeCheck", payload);
    }
  }
};

export default task;
