<template>
  <div id="app">
    <h1 class="siteTitle">Vue-todo-app</h1>
    <button id="show-modal" @click="newTaskModal = true">Show Modal</button>

    <TaskList
      :taskList="tasks"
      @updateTaskName="updateTaskName"
      @changeCheck="changeCheck"
    />

    <modal v-if="newTaskModal" @close="newTaskModal = false">
      <h3 slot="header">Add new task</h3>
      <form slot="body" class="newTaskForm">
        <table>
          <tr>
            <th>task name</th>
            <td><input type="text" v-model="newTaskForm.name" /></td>
          </tr>
          <tr>
            <th>tag name</th>
            <td>
              <vue-simple-suggest
                v-model="suggestText"
                :list="tagNameList"
                :styles="autoCompleteStyle"
                :destyled="true"
                :filter-by-query="true"
              >
              </vue-simple-suggest>
              <div>
                <p>選択中のタグ: {{}}</p>
              </div>
            </td>
          </tr>
        </table>
      </form>
    </modal>
  </div>
</template>

<script>
import Vuex from "vuex";
import "normalize.css";
import TaskList from "@/components/TaskList";
import Modal from "@/components/Modal";
import VueSimpleSuggest from "vue-simple-suggest";
import "vue-simple-suggest/dist/styles.css"; // Using a css-loader

export default {
  name: "app",
  components: {
    TaskList,
    Modal,
    VueSimpleSuggest
  },
  data() {
    return {
      newTaskModal: false,
      newTaskForm: {
        id: null,
        name: "",
        tags: "",
        done: false
      },
      suggestText: "",
      autoCompleteStyle: {
        vueSimpleSuggest: "position-relative",
        inputWrapper: "",
        defaultInput: "form-control",
        suggestions: "position-absolute list-group z-1000",
        suggestItem: "list-group-item"
      }
    };
  },
  computed: {
    ...Vuex.mapState("task", ["tasks"]),
    ...Vuex.mapState("tag", ["tags"]),
    ...Vuex.mapGetters("tag", ["tagNameList"])
  },
  created() {
    this.newTaskForm.id = Object.keys(this.tags).length + 1;
  },
  methods: {
    ...Vuex.mapActions("task", ["updateTaskName", "changeCheck"])
  }
};
</script>

<style lang="scss" scoped>
#app {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 10px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.siteTitle {
  padding: 0.5em;
  border-bottom: 1px solid #2c3e50;
  text-align: center;
}

.newTaskForm {
  table {
    width: 100%;
  }

  th, td {
    text-align: left;
    vertical-align: top;
  }

  th {
    width: 20%;
  }

  td {
    width: 80%;
  }

  /deep/ input {
    width: 100%;
  }
}
</style>
