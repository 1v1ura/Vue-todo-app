<template>
  <ul class="taskList">
    <li
      v-for="task in taskList"
      :key="task.id"
      class="taskList__item"
      :class="task.done ? 'taskList__item--done' : ''"
      @click="changeCheck({ id: task.id, done: !task.done })"
    >
      <div class="taskList__check">
        <input
          type="checkbox"
          :checked="task.done"
          class="taskList__check-input"
          :ref="'checkbox-' + task.id"
        />
        <FontAwesomeIcon :icon="checkIconState[task.id]" size="lg" />
      </div>
      <div>
        <p class="taskList__label">{{ task.name }}</p>
        <TagList :tagList="task.tags" />
      </div>
      <div class="taskList__controller">
        <button @click.stop="handleRemove(task)">
          <FontAwesomeIcon :icon="icons.faTrashAlt" />
        </button>
        <button @click.stop="handleEdit(task)">
          <FontAwesomeIcon :icon="icons.faEdit" />
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faCheckCircle,
  faCircle,
  faEdit,
  faTrashAlt
} from "@fortawesome/free-regular-svg-icons";
import TagList from "@/components/TagList";

export default {
  name: "TaskList",
  components: {
    FontAwesomeIcon,
    TagList
  },
  data() {
    return {
      icons: {
        faEdit,
        faTrashAlt
      }
    };
  },
  props: {
    taskList: {
      type: Array,
      default: () => [],
      required: true
    },
  },
  computed: {
    checkIconState() {
      let obj = {};
      this.taskList.forEach(task => {
        obj[task.id] = task.done ? faCheckCircle : faCircle;
      });
      return obj;
    }
  },
  methods: {
    changeCheck(data) {
      this.$emit("changeCheck", data);
    },
    handleEdit(task) {
      this.$emit("editTask", task);
    },
    handleRemove(task) {
      this.$emit("removeTask", task);
    },
  }
};
</script>

<style lang="scss" scoped>
.taskList {
  padding-left: 0;
  list-style: none;

  &__item {
    display: flex;
    flex-flow: row nowrap;
    align-items: stretch;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-shadow: 5px 5px 5px #ccc;
    cursor: pointer;
    transition: background-color 0.1s, color 0.1s;

    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  &__check {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 30px;
    margin-right: 10px;
    cursor: pointer;
  }

  &__controller {
    flex: 0 0 auto;
    margin-left: auto;
    padding-left: 10px;
    align-self: flex-end;

    > button {
      padding: 0;
      appearance: none;
      border: none;
      background: transparent;
      outline: none;
      cursor: pointer;

      &:not(:last-child) {
        margin-right: 10px;
      }
    }
  }

  &__check-input {
    display: none;
  }

  &__label {
    display: block;
    margin-top: 0;
    margin-bottom: 5px;
    font-weight: bold;
  }

  &__item--done {
    background: #cccccc70;
    color: #9b9b9b;
  }
}
</style>
