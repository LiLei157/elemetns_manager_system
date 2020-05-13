<template>
  <el-container style="height:100%">
    <el-aside width="auto"><common-aside></common-aside></el-aside>
    <el-container>
      <el-header><common-header></common-header></el-header>
      <common-tag></common-tag>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from '../components/CommonAside.vue' //导入aside组件
import CommonHeader from '../components/CommonHeader.vue' //导入header组件
import CommonTag from '../components/CommonTag.vue'

export default {
  components: {
    CommonAside,
    CommonHeader,
    CommonTag
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  padding: 0;
}
.el-main {
  padding-top: 0;
}
</style>
