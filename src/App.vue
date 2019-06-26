<template>
  <div id="app">
    <h1 class="siteTitle">Vue-todo-app</h1>
    <button id="show-modal" @click="taskFormModal = true">New Task</button>

    <TaskList
      :taskList="tasks"
      @changeCheck="changeCheck"
      @removeTask="removeTask"
      @editTask="editTask"
    />

    <modal v-if="taskFormModal" @close="closeTaskFormModal">
      <h3 slot="header">{{ editFlg ? "Edit Task" : "Add new task" }}</h3>
      <form slot="body" class="taskForm">
        <table>
          <tr>
            <th>task name</th>
            <td>
              <input
                type="text"
                placeholder="input task name"
                v-model="taskForm.name"
                :style="errorFlg ? errorStyle : ''"
              />
            </td>
          </tr>
          <tr>
            <th>tag name</th>
            <td>
              <TagSetting
                :tags="tags"
                :setTags="setTags"
                @addNewTag="addNewTag"
              />
            </td>
          </tr>
        </table>
      </form>
      <div slot="footer">
        <button @click="addTaskSubmit">add</button>
      </div>
    </modal>
  </div>
</template>

<script>
import Vuex from "vuex";
import "normalize.css";
import TaskList from "@/components/TaskList";
import Modal from "@/components/Modal";
import TagSetting from "@/components/TagSetting";

export default {
  name: "app",
  components: {
    TaskList,
    Modal,
    TagSetting
  },
  data() {
    return {
      taskFormModal: false,
      editFlg: false,
      errorFlg: false,
      errorStyle: {
        border: "3px solid red"
      },
      taskForm: {
        id: null,
        name: "",
        tags: [],
        done: false
      },
      setTags: []
    };
  },
  computed: {
    ...Vuex.mapState("task", ["tasks"]),
    ...Vuex.mapState("tag", ["tags"]),
    ...Vuex.mapGetters("tag", ["getTagData"])
  },
  methods: {
    ...Vuex.mapActions("task", ["changeCheck", "removeTask"]),
    ...Vuex.mapActions("tag", ["addNewTag"]),
    closeTaskFormModal() {
      this.editFlg = false;
      this.taskFormModal = false;
    },
    addTaskSubmit() {
      if (this.taskForm.name.length === 0) {
        this.errorFlg = true;
        return;
      } else {
        this.errorFlg = false;
      }

      this.setTags.forEach(tag => {
        this.taskForm.tags = [];

        if (tag.id === null) {
          tag.id = this.tags[this.tags.length - 1].id + 1;
          this.$store.dispatch("tag/addNewTag", tag);
        }

        this.taskForm.tags.push(tag.id);
      });

      if (this.editFlg) {
        this.$store.dispatch("task/updateTask", this.taskForm);
      } else {
        this.taskForm.id = this.tasks[this.tasks.length - 1].id + 1;
        this.$store.dispatch("task/addNewTask", this.taskForm);
      }

      // init
      this.taskForm.name = "";
      this.taskForm.tags = [];
      this.setTags = [];
      this.taskFormModal = false;
    },
    editTask(task) {
      this.editFlg = true;
      this.taskFormModal = true;
      this.taskForm = task;
      this.setTags = this.taskForm.tags.map(tagId => {
        return this.getTagData(tagId);
      });
    }
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

.taskForm {
  table {
    width: 100%;
  }

  th,
  td {
    text-align: left;
    vertical-align: top;
  }

  th {
    width: 20%;
  }

  td {
    width: 80%;
  }

  input {
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    border: 1px solid #cde;
    border-radius: 3px;
    background: white;
    outline: none;
    -webkit-transition: all 0.1s;
    transition: all 0.1s;
    -webkit-transition-delay: 0.05s;
    transition-delay: 0.05s;
  }
}
</style>
