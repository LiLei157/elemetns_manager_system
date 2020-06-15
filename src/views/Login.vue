<!--
 * @Author: your name
 * @Date: 2020-01-19 09:28:01
 * @LastEditTime: 2020-06-12 14:18:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ele-manager\src\views\Login.vue
 -->
<template>
  <div class="login">
    <el-form :model="ruleForm">
      <div class="logo"></div>
      <el-form-item
        v-for="item in ruleLabel"
        :label="item.label"
        :prop="item.model"
        :key="item.label"
      >
        <el-input
          :type="item.type"
          v-model="ruleForm[item.model]"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-button type="primary" @click="submitLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      ruleLabel: [
        {
          label: '用户名',
          model: 'username',
          type: 'text'
        },
        {
          label: '密码',
          model: 'password',
          type: 'password'
        }
      ]
    }
  },
  methods: {
    submitLogin() {
      //test..
      // this.postRequest()

      console.log(this.ruleForm)
      this.$http.post('api/login/getMenu', this.ruleForm).then(res => {
        res = res.data
        console.log('res', res)
        this.$store.commit('clearMenu')
        this.$store.commit('setMenu', res.data.menu)
        this.$store.commit('setToken', res.data.token)
        this.$store.commit('addMenu', this.$router)
        this.$router.push({ name: 'home' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url('../assets/scss/images/bg-logo.jpg');
  .el-form {
    border: 1px solid #74b5c9;
    border-radius: 5px;
    box-shadow: 0 0 10 #3fbeeb;
    .logo {
      width: 90px;
      height: 90px;
      background: url('../assets/scss/images/logo.png') no-repeat center;
      background-size: 90px 90px;
      margin: 0 auto;
    }
    width: 298px;
    margin: auto;
    padding: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #000;
    opacity: 0.8;
    .el-button {
      margin-bottom: 20px;
      width: 100%;
    }
  }
}
</style>
