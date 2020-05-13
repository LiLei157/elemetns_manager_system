<!--
 * @Author: your name
 * @Date: 2020-01-13 15:14:46
 * @LastEditTime: 2020-05-11 20:54:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ele-manager\src\components\CommonTable.vue
 -->
<template>
  <div class="common-table">
    <el-table
      :height="tableHeight"
      stripe
      size="medium"
      :data="tableData"
      v-loading="config.loading"
    >
      <el-table-column height="200" label="序号" width="85">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            (config.page - 1) * 20 + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>

      <!-- 处理带图片的table列 -->
      <el-table-column
        show-overflow-tooltip
        v-for="item in tableLabel.filter(item => item.prop === 'image')"
        :inline="true"
        :key="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 125"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">
            <img
              :src="scope.row.image"
              alt=""
              style="width:100px;height:100px"
            />
          </span>
        </template>
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        v-for="item in tableLabel.filter(
          item => item.prop !== 'image' && item.prop !== 'status'
        )"
        :inline="true"
        :key="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 125"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        v-for="item in tableLabel.filter(item => item.prop === 'status')"
        :inline="true"
        :key="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 125"
      >
        <template slot-scope="scope">
          <el-switch disabled v-model="scope.row.status"></el-switch>
        </template>
      </el-table-column>

      <!-- 操作列 -->
      <el-table-column label="操作" width="200" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 :current-page.sync="config.page"： 将当前页面同步给配置中的config
    注意： 添加事件 current-change 当点击某个页数时，需要将该页数传递给父组件也就是table，然后父组件去请求对应页数的数据
    -->
    <el-pagination
      class="pager"
      layout="prev, pager, next"
      :total="config.total"
      :current-page.sync="config.page"
      @current-change="changePage"
      :page-size="20"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    tableData: Array, //table表数据，Array数组类型，里面是装有一条条数据的对象
    tableLabel: Array, //table列表头
    config: Object, // 配置,比如分页数
    tableHeight: String
  },
  methods: {
    // 编辑用户,需要向父组件传递需要row参数，表明是哪行的数据
    handleEdit(row) {
      // console.log(row)
      this.$emit('edit', row)
    },
    // 删除用户,需要向父组件传递需要删除的row参数，即表明要删除哪行数据
    handleDelete(row) {
      console.log(row)
      this.$emit('del', row)
    },
    // 当页面改变时
    changePage(page1) {
      this.$emit('change', page1)
    }
  },
  mounted() {
    console.log('table组件内的tableData：', this.tableData)
    console.log('table组件内的tableLabel', this.tableLabel)
  }
}
</script>

<style lang="scss" scoped>
.common-table {
  height: calc(100% - 62px);
  background-color: #fff;
  position: relative;

  .pager {
    position: absolute;
    bottom: 0;
    right: 20px;
    z-index: 100;
  }
}
</style>
