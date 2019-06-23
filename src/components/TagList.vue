<template>
  <ul class="tagList">
    <li v-for="id in tagList" :key="id" class="tagList__item">{{ tags[id].name }}</li>
  </ul>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "tagList",
  props: {
    tagList: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  computed: {
    ...mapState("tag", ["tags"]),
  }
};
</script>

<style lang="scss" scoped>
.tagList {
  padding-left: 0;

  &__item {
    display: inline-block;
    padding: 0.1em 0.5em;
    border: 1px solid #ccc;

    &:not(:first-child) {
      margin-left: 5px;
    }
  }
}
</style>
