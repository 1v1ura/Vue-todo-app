const tag = {
  namespaced: true,
  state: {
    tags: [
      { id: 1, name: "sample-tag1" },
      { id: 2, name: "sample-tag2" }
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
      state.tags = [...state.tags, tag]
    }
  },
  actions: {
    addNewTag({ commit }, payload) {
      commit("addNewTag", payload);
    }
  }
};

export default tag;
