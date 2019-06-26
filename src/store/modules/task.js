const task = {
  namespaced: true,
  state: {
    tasks: [
      { id: 1, name: "hoge", done: true, tags: [1, 2] },
      { id: 2, name: "fuga", done: true, tags: [1, 3] },
      { id: 3, name: "piyo", done: false, tags: [1] }
    ]
  },
  mutations: {
    updateTaskName(state, { id, name }) {
      const target = state.tasks.find(task => task.id === id);
      if (target) {
        target.name = name;
      }
    },
    changeCheck(state, { id, done }) {
      const target = state.tasks.find(task => task.id === id);
      if (target) {
        target.done = done;
      }
    },
    addNewTask(state, { id, name, done, tags }) {
      state.tasks.push({
        id: id,
        name: name,
        done: done,
        tags: tags.slice()
      });
    },
    removeTask(state, { id }) {
      state.tasks.some((task, index) => {
        if (task.id === id) {
          state.tasks.splice(index, 1);
          return false
        }
      })
    },
    updateTask(state, {id, name, done, tags}) {
      state.tasks.some((task, index) => {
        if (task.id === id) {
          state.tasks[index] = {
            id: id,
            name: name,
            done: done,
            tags: tags.slice()
          }
        }
      })
    }
  },
  actions: {
    updateTaskName({ commit }, payload) {
      commit("updateTaskName", payload);
    },
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
