<!--
 * @Author: your name
 * @Date: 2020-05-18 15:58:40
 * @LastEditTime: 2020-05-18 16:08:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ele-manager\src\components\Loading.vue
-->
<template>
  <div class="loading">
    <img src="images/loading-svg/loading-bars-skyblue.svg" alt="" />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  img {
    width: 70px;
  }
}
</style>
