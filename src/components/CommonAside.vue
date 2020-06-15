<template>
  <el-menu
    :default-active="$router.path"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="collapse"
  >
    <h3 class="aside-title" v-show="collapse == false">
      mini后台管理系统
    </h3>
    <h3 class="aside-title" v-show="collapse == true">
      Demo
    </h3>
    <el-menu-item
      style="font-size:12px"
      :index="item.path"
      v-for="item in noChildren"
      :key="item.path"
      @click="clickmenu(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <el-submenu
      :index="item.label"
      v-for="(item, index) in hasChildren"
      :key="index"
    >
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span>{{ item.label }}</span>
      </template>

      <el-menu-item
        :index="subitem.path"
        v-for="(subitem, subindex) in item.children"
        :key="subindex"
        @click="clickmenu(subitem)"
        >{{ subitem.label }}</el-menu-item
      >
    </el-submenu>
  </el-menu>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      // asideitems: [
      //   {
      //     icon: 's-home',
      //     name: 'home',
      //     label: '首页 ',
      //     path: '/index'
      //     //   children: [] // 表示该菜单下是否还有子菜单
      //   },
      //   {
      //     icon: 'video-play',
      //     name: 'video',
      //     label: '视频管理页',
      //     path: '/video'
      //   },
      //   {
      //     icon: 'user',
      //     name: 'user',
      //     label: '用户管理页',
      //     path: '/user'
      //   },
      //   {
      //     // 该菜单项下有子菜单，所以没有path路由
      //     icon: 'more',
      //     label: '其他',
      //     children: [
      //       {
      //         label: '更多1',
      //         name: 'other1',
      //         path: ''
      //       },
      //       {
      //         label: '更多2',
      //         name: 'other2',
      //         path: ''
      //       }
      //     ]
      //   }
      // ]
    }
  },
  computed: {
    noChildren() {
      return this.menu.filter(item => !item.children) //返回asideitems数组中没有children的项组成新的数组
    },
    hasChildren() {
      return this.menu.filter(item => item.children) //返回有children子项菜单的新数组
    },
    ...mapState({
      collapse: state => state.tab.isCollapse
    }),
    menu() {
      console.log('commonAside中menu:', this.$store.state.tab.menu)
      return this.$store.state.tab.menu
    }
  },
  methods: {
    clickmenu(item) {
      this.$router.push({ name: item.name })
      this.$store.commit('selectorMenu', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  border: none;
  height: 100vh;
  background: #2f4050;
  .aside-title {
    color: #fff;
    height: 48px;
    line-height: 48px;
    text-align: center;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
