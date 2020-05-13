<!--
 * @Author: your name
 * @Date: 2020-05-08 14:49:14
 * @LastEditTime: 2020-05-11 20:19:31
 * @LastEditors: Please set LastEditors
 * @Description: 公共的商品管理Search部分组件
 * @FilePath: \ele-manager\src\components\CommonSearch.vue
 -->
<template>
  <div class="box">
    <div class="search" :goodsList="goodsList">
      <label class="title">商品分类：</label>
      <el-select label="商品名称" v-model="classify" size="mini">
        <el-option
          v-for="(item, index) in goodsList"
          :key="index"
          :value="item"
        ></el-option>
      </el-select>

      <label class="title" style="margin-left:20px">商品名称：</label>
      <el-col :span="4">
        <el-input
          v-model="ipt"
          placeholder="请输入商品名称"
          size="mini"
          width="200px"
        ></el-input>
      </el-col>
      <button class="sure" @click="findHandler(ipt)">查询</button>
      <button class="cancel" @click="exportHandler">导出</button>
    </div>
    <div class="biaoyu" v-show="isShow">
      列表[虚拟销量],[库存],[排序]可进行快速修改,双击或者单击进入编辑模式,失去焦点可进行自动保存
      <i class="el-icon-close" @click="isShow = false"></i>
    </div>
    <slot name="button"></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      classify: '',
      ipt: '',
      isShow: true
    }
  },
  props: {
    goodsList: Array
  },
  methods: {
    findHandler(val) {
      this.$emit('findHandler', val)
    },
    exportHandler() {
      this.$message({
        type: 'success',
        message: '该功能暂缺，请持续期待.....'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  padding: 20px 0;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
  .title {
    font-size: 12px;
    color: #ccc;
    display: inline-block;
    height: 28px;
    line-height: 28px;
    padding: 0 10px;
  }
  button {
    margin-left: 20px;
    outline: none;
    border: 0;
    font-size: 10px;
    padding: 0 15px;
    color: #fff;
  }
  .sure {
    background-color: #409eff;
    cursor: pointer;
  }
  .cancel {
    background-color: #fff;
    color: #333;
    border: 1px solid #ccc;
    cursor: pointer;
  }
  .cancel:hover {
    border: 1px solid #409eff;
    transform: scale(1.1);
    transition: all 0.5s;
  }
}
.biaoyu {
  margin: 20px 0;
  padding: 15px;
  font-size: 12px;
  color: #31708f;
  font-weight: 100;
  background-color: #bce8fe;
  border-radius: 5px;
  position: relative;

  i {
    font-size: 14px;
    position: absolute;
    right: 10px;
    cursor: pointer;
  }
}
</style>
