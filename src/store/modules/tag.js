const tag = {
  namespaced: true,
  state: {
    tags: [
      { id: 1, name: "tag1" },
      { id: 2, name: "tag2" },
      { id: 3, name: "tag3" },
      { id: 4, name: "tag4" }
    ]
  },
  getters: {
    getTagData: state => id => {
      return state.tags.find(tag => tag.id === id);
    },
    getTagName: state => id => {
      const tag = state.tags.find(tag => tag.id === id);
      return tag.name;
    }
  },
  mutations: {
    addNewTag(state, tag) {
      state.tags.push(tag)
    }
  },
  actions: {
    addNewTag({ commit }, payload) {
      commit("addNewTag", payload);
    }
  }
};

export default tag;
