const task = {
  namespaced: true,
  state: {
    tasks: [
      { id: 1, name: "Sampe", done: false, tags: [1, 2] },
    ]
  },
  getters: {},
  mutations: {
    changeCheck(state, { id, done }) {
      state.tasks.some(task => {
        if (task.id === id) {
          task.done = done;
          return false;
        }
      });
    },
    addNewTask(state, task) {
      state.tasks = [...state.tasks, Object.assign({}, task)];
    },
    removeTask(state, { id }) {
      state.tasks.some((task, index) => {
        if (task.id === id) {
          state.tasks.splice(index, 1);
          return false;
        }
      });
    },
    updateTask(state, data) {
      const tasks = state.tasks.map(task => {
        if (task.id === data.id) {
          return Object.assign({}, data);
        } else {
          return Object.assign({}, task);
        }
      });
      state.tasks = tasks;
    }
  },
  actions: {
    changeCheck({ commit }, payload) {
      commit("changeCheck", payload);
    },
    addNewTask({ commit }, payload) {
      commit("addNewTask", payload);
    },
    updateTask({ commit }, payload) {
      commit("updateTask", payload);
    },
    removeTask({ commit }, payload) {
      commit("removeTask", payload);
    }
  }
};

export default task;
