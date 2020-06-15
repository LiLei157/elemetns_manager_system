<!--
 * @Author: your name
 * @Date: 2020-01-05 16:43:01
 * @LastEditTime: 2020-06-12 16:40:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ele-manager\src\views\Goods\GoodsClassify.vue
-->
<template>
  <div style="height:900px">
    <Loading></Loading>
  </div>
</template>

<script>
import Loading from '@/components/Loading'
export default {
  components: {
    Loading
  },
  mounted() {
    console.log('GoodsClassify mounted...')
  }
}
</script>

<style lang="scss" scoped></style>
