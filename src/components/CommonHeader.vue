<template>
  <header>
    <div class="left-content">
      <el-button
        type="primary"
        icon="el-icon-menu"
        size="small"
        @click="collapseChilk"
      ></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: current.path }" v-if="current">{{
          current.label
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right-content">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img class="user" :src="userImg" alt="" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item size="mini">个人中心</el-dropdown-item>
          <el-dropdown-item size="mini" @click.native="loginOut"
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      current: state => state.tab.currentmenu
    })
  },
  data() {
    return {
      userImg: require('../assets/scss/images/user.png')
    }
  },
  methods: {
    handlerClick(current) {
      console.log(current.name)
    },
    collapseChilk() {
      this.$store.commit('Collapse')
    },
    //退出登录时，清除用户token和menu动态路由参数,并且手动刷新页面
    // 因为对路由拦截做了处理，如果没有用户token并且路由参数也为空，那么此时重定向到登录页面
    loginOut() {
      console.log('loginOut.....')
      this.$store.commit('clearToken')
      this.$store.commit('clearMenu')
      location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  padding: 0 20px;
  background-color: #333;
  height: 100%;
  align-items: center;
  justify-content: space-between;

  .left-content {
    display: flex;
    align-items: center;
    .el-button {
      margin-right: 20px;
    }
  }
  .right-content {
    .user {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
  }
}
</style>
<style lang="scss">
.el-breadcrumb__item {
  .el-breadcrumb__inner {
    color: #666;
    font-weight: normal;
  }
  &:last-child {
    .el-breadcrumb__inner {
      color: #fff;
    }
  }
}
</style>
