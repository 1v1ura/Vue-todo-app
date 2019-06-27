<template>
  <div class="tag-setting">
    <ul class="tag-setting--list">
      <li
        v-for="tag in setTagData"
        :key="tag.id"
        class="tag-setting__list-item"
      >
        {{ tag.name }}
        <span class="tag-setting__close" @click="removeSetTag(tag)">
          <FontAwesomeIcon :icon="icons.close" size="sm" />
        </span>
      </li>
      <li class="tag-setting__input">
        <input
          type="text"
          v-model="serchTagWord"
          placeholder="input tag name"
        />
      </li>
    </ul>
    <ul class="tag-setting__suggest" v-show="isShowSuggest">
      <li
        v-for="item in suggestlist"
        :key="item.id"
        class="tag-setting__suggest-item"
        @click="addSetTag(item)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";

export default {
  name: "tagSetting",
  components: {
    FontAwesomeIcon
  },
  props: {
    tags: {
      type: Array,
      default: () => []
    },
    setTags: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      icons: {
        close: faTimesCircle
      },
      serchTagWord: "",
      setTagData: this.setTags
    };
  },
  computed: {
    ...mapGetters("tag", ["getTagName"]),
    filteredTag() {
      return this.tags.filter(tag => {
        if (
          tag.name.indexOf(this.serchTagWord) !== -1 &&
          !this.setTagData.includes(tag)
        ) {
          return tag;
        }
      });
    },
    suggestlist() {
      const suggestlist = [];
      this.filteredTag.some((tag, index) => {
        if (index >= 5) {
          return false;
        } else {
          suggestlist.push(tag);
        }
      });
      return suggestlist;
    },
    isShowSuggest() {
      return this.serchTagWord.length > 0 && this.suggestlist.length >= 1;
    },
    newTagName() {
      // eslint-disable-next-line no-irregular-whitespace
      const reg = /[ 　]$/;
      if (reg.test(this.serchTagWord)) {
        return this.serchTagWord.trim();
      } else {
        return "";
      }
    }
  },
  methods: {
    addSetTag(tag) {
      const idExtraction = this.setTagData.map(tag => tag.id);
      const nameExtraction = this.setTagData.map(tag => tag.name);
      const idCheck = tag.id === null ? true : !idExtraction.includes(tag.id);
      const nameCheck = !nameExtraction.includes(tag.name);

      if (idCheck && nameCheck) {
        this.setTagData.push(tag);
        this.serchTagWord = "";
      }
    },
    removeSetTag(tag) {
      this.setTagData.some((checkTag, index) => {
        if (checkTag.name === tag.name) {
          this.setTagData.splice(index, 1);
          return false;
        }
      });
    }
  },
  watch: {
    newTagName() {
      const newTagName = this.newTagName;
      if (newTagName.length > 0) {
        const checkDuplicateTagName = this.tags.find(tag => {
          return tag.name === newTagName;
        });

        if (!checkDuplicateTagName) {
          this.addSetTag({ id: null, name: newTagName });
        }

        this.serchTagWord = "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.tag-setting {
  position: relative;

  .tag-setting--list {
    display: flex;
    flex-flow: row wrap;
    margin: 0;
    padding: 8px 10px;
    border: 1px solid #cde;
    border-radius: 3px;
    list-style: none;

    .tag-setting__list-item {
      flex: 0 0 auto;
      display: inline-block;
      margin-right: 10px;
      margin-bottom: 5px;
      padding: 0.1em 0.5em;
      border: 1px solid #ccc;
      font-size: 14px;
    }

    .tag-setting__input {
      display: inline-block;
      flex: 1 1 10em;

      > input {
        width: 100%;
        border: 0;
        background: white;
        outline: none;
      }
    }
  }

  .tag-setting__close {
    display: inline-block;
    margin-left: 5px;
    cursor: pointer;
  }

  .tag-setting__suggest {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0;
    margin-top: -2px;
    list-style: none;
    padding: 0;
    border: 1px solid #cde;
    border-top: none;
    background-color: #fff;

    .tag-setting__suggest-item {
      padding: 10px;
      cursor: pointer;

      &:hover {
        background-color: #f2f2f2;
      }
    }
  }
}
</style>
