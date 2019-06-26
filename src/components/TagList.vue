<template>
  <ul class="tagList">
    <li v-for="id in tagList" :key="id" class="tagList__item">{{ getTagName(id) }}</li>
  </ul>
</template>

<script>
import { mapState, mapGetters } from "vuex";
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
    ...mapGetters("tag", ["getTagName"])
  }
};
</script>

<style lang="scss" scoped>
.tagList {
  margin: 0 -5px;
  padding-left: 0;

  &__item {
    display: inline-block;
    padding: 0.1em 0.5em;
    margin: 5px;
    border: 1px solid #ccc;
  }
}
</style>
