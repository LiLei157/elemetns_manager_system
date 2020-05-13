<!--
 * @Author: your name
 * @Date: 2020-05-03 20:49:04
 * @LastEditTime: 2020-05-03 22:06:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ele-manager\src\views\ElementUI\Tab.vue
 -->
<template>
  <div class="Tab">
    <el-card class="card" style="width:100%">
      <div class="title">默认风格</div>
      <el-tabs v-model="activeName1">
        <el-tab-pane
          v-for="(item, index) in tabList"
          :key="index"
          :label="item.label"
          :name="item.name"
          >{{ item.text }}</el-tab-pane
        >
      </el-tabs>
    </el-card>
    <el-card class="card">
      <div class="title">可绑定事件的tab</div>
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, index) in tabList"
          :label="item.label"
          :name="item.name"
          :key="index"
          >{{ item.text }}</el-tab-pane
        >
      </el-tabs>
    </el-card>
    <el-card class="card">
      <div class="title">卡片化tag</div>
      <el-tabs v-model="activeName3" type="border-card">
        <el-tab-pane
          v-for="(item, index) in tabList"
          :label="item.label"
          :name="item.name"
          :key="index"
          >{{ item.text }}</el-tab-pane
        >
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName1: '',
      activeName2: '',
      activeName3: '',
      tabList: [
        {
          label: '网站设置',
          text: '网站设置',
          name: 'first'
        },
        {
          label: '用户管理',
          text: '用户管理',
          name: 'second'
        },
        {
          label: '配置管理',
          text: '配置管理',
          name: 'third'
        },
        {
          label: '角色管理',
          text: '角色管理',
          name: 'fourth'
        },
        {
          label: '商品管理',
          text: '商品管理',
          name: 'fifth'
        }
      ]
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log('tab：', tab)
      console.log('event：', event)
      this.$message({
        message: tab.label,
        type: 'success'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.Tab {
  .card {
    margin-bottom: 20px;
    .title {
      height: 30px;
      line-height: 30px;
      border-bottom: 1px solid #ccc;
      margin-bottom: 10px;
    }
  }
}
</style>
