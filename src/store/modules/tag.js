const tag = {
  namespaced: true,
  state: {
    tags: {
      1: {
        name: "tag1"
      },
      2: {
        name: "tag2"
      },
      3: {
        name: "tag3"
      }
    }
  },
  getters: {
    tagNameList(state) {
      return Object.keys(state.tags).map(id => state.tags[id].name);
    }
  }
};

export default tag;
