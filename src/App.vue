<!--
 * @Author: your name
 * @Date: 2020-01-02 18:39:55
 * @LastEditTime: 2020-06-11 11:13:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \elementui+vue\ele-manager\src\App.vue
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    console.log('start...')
    this.initWebSocket()
  },
  methods: {
    initWebSocket() {
      if (WebSocket == 'undefined') {
        alert('您的浏览器暂不支持!')
      } else {
        var webSocket = new WebSocket(
          // 'ws://192.168.2.200/sockjs-node/958/rew4kkct/websocket'
          'ws://192.168.2.200/websocket/admin'
        )
        webSocket.onopen = function() {
          console.log('WebSocket连接成功!!')
        }
        webSocket.onerror = function(e) {
          console.log(e)
        }
        webSocket.onmessage = function(res) {
          console.log(res)
        }
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  height: 100vh; // 100vh:当前屏幕高度的百分百
}
</style>
