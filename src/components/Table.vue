<!--
 * @Author: your name
 * @Date: 2020-05-11 15:49:55
 * @LastEditTime: 2020-05-11 16:25:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ele-manager\src\components\Table.vue
 -->
<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <!-- 这里是对tableLableList列表中的字段进行过滤，处理image字段 -->
      <el-table-column
        v-for="item in tableLabelList.filter(el => el.prop === 'image')"
        :key="item.prop"
        show-overflow-tooltip
        :label="item.label"
        :width="item.width ? item.width : 75"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">
            <img
              :src="scope.row.imageUrl"
              alt=""
              style="width:100px;height:100px"
            />
          </span>
        </template>
      </el-table-column>

      <el-table-column
        v-for="item in tableLabelList.filter(
          ele => ele.prop !== 'image' && ele.prop !== 'status'
        )"
        :key="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 180"
      >
        <template slot-scope="scope">
          <span style="margin-left:10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>

      <el-table-column
        v-for="item in tableLabelList.filter(ele => ele.prop === 'status')"
        :key="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 50"
      >
        <template slot-scope="scope">
          <!-- switch开关：之所以disableed，是不希望在这里进行状态修改，而是通过编辑的方式提交post请求修改 -->
          <el-switch disabled v-model="scope.row.status"></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      props: {
        tableData: Array, // 存放父组件传递过来的表数据
        tableLabelList: Array // 存放父组件传递过来的表字段数据
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
