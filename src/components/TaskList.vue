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
    </li>
  </ul>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCheckCircle, faCircle } from "@fortawesome/free-regular-svg-icons";
import TagList from "@/components/TagList";

export default {
  name: "TaskList",
  components: {
    FontAwesomeIcon,
    TagList
  },
  props: {
    taskList: {
      type: Array,
      default: () => [],
      required: true
    }
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
    updateTaskName(event, id) {
      const data = {
        id: id,
        name: event.currentTarget.value
      };

      this.$emit("updateTaskName", data);
    },
    changeCheck(data) {
      this.$emit("changeCheck", data);
    }
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

  &__check-input {
    display: none;
  }

  &__label {
    display: block;
    margin-top: 0;
    margin-bottom: 10px;
    font-weight: bold;
  }

  &__item--done {
    background: #cccccc70;
    color: #9b9b9b;
  }
}
</style>
