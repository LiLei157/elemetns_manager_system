<!--
 * @Author: your name
 * @Date: 2020-01-05 15:12:22
 * @LastEditTime: 2020-05-02 14:19:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ele-manager\src\components\CommonTag.vue
 -->
<template>
  <div class="tags">
    <el-tag
      :key="tag.name"
      v-for="(tag, index) in tags"
      :closable="tag.name !== 'home'"
      :disable-transitions="false"
      @close="handleClose(tag, index)"
      @click="handlerClick(tag)"
      size="small"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState({
      tags: state => state.tab.tagList
    })
  },
  data() {
    return {
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    ...mapMutations({
      close: 'closeTag'
    }),
    // 标签页关闭点击事件
    handleClose(tag, index) {
      let tagLength = this.tags.length - 1
      this.close(tag)
      // 判断点击的tag是不是当前页面tag，如果是，关闭页面，如果不是则不关闭
      if (!tag.name === this.$router.name) {
        return
      } else {
        // 判断当前选中的tag是不是最后一个，如果最后一个，页面往左跳转，如果不是，页面往右跳转
        if (index === tagLength) {
          this.$router.push({ name: this.tags[index - 1].name })
        } else {
          this.$router.push({ name: this.tags[index + 1].name })
        }
      }
    },
    ...mapMutations({
      close: 'closeTag'
    }),
    handlerClick(tag) {
      this.$router.push({ name: tag.name })
      this.$store.commit('selectorMenu', tag)
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
