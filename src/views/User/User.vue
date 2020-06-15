<template>
  <div class="usermanager">
    <!-- 点击编辑或新增后的弹出框，这里需要使用弹窗组件 -->
    <el-dialog
      class="dialog"
      :before-close="closeHandler"
      :visible.sync="isShow"
      :title="this.operatType == 'add' ? '新增用户' : '编辑用户'"
    >
      <common-form :form="operatForm" :formLabel="operatLabel"></common-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="sureClickHandler">确 定</el-button>
      </span>
    </el-dialog>

    <div class="header">
      <el-button type="primary" @click="addHandler">+ 新增</el-button>
      <!-- 父传子传参： 把封装组件时需要传递给组件的form表单和formLabel绑定上 -->
      <common-form
        class="search_form"
        inline
        :formLabel="formLabel"
        :form="Searchform"
      >
        <el-button type="primary" @click="searchHandler">搜索</el-button>
      </common-form>
    </div>
    <!-- 1、@change监听子组件中传递参数时定义的自定义函数名
      当页面改变时，重新请求对应页面数据,所以@change="getList" -->
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :tableHeight="'350'"
      :config="config"
      @change="getList"
      @edit="editHandler"
      @del="delHandler"
    ></common-table>
  </div>
</template>

<script>
import CommonForm from '../../components/CommonForm'
import CommonTable from '../../components/CommonTable'
export default {
  components: {
    CommonForm,
    CommonTable
  },
  data() {
    return {
      isShow: false,
      operatType: 'add', // 默认是add添加，这里通过此属性判断
      operatForm: {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sexLabel: ''
      },
      operatLabel: [
        {
          model: 'name',
          label: '姓名'
        },
        {
          model: 'age',
          label: '年龄'
        },
        {
          model: 'sexLabel',
          label: '性别',
          type: 'select',
          options: [
            {
              value: 'val',
              label: '女'
            },
            {
              value: 'nan',
              label: '男'
            }
          ]
        },
        {
          model: 'birth',
          label: '出生日期',
          type: 'DatePicker'
        },
        {
          model: 'addr',
          label: '地址'
        }
      ],
      // 搜索 表单对象,表单对象中的属性要对应上表单数据中的model字段的值
      Searchform: {
        // <el-input v-model="form.name"></el-input>： ele源码中，v-model双向数据绑定，是要将表单与数据实现双向绑定
        keyword: '',
        searchBtn: ''
      },
      // 表单域，这里只有一个input的表单域
      formLabel: [
        {
          label: '', //搜索框，默认没有label
          model: 'keyword',
          // type: 'Switch',
          options: []
          // type:'input' type字段，根据字段去显示
        }
      ],
      tableData: [],
      // 表头
      tableLabel: [
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'age',
          label: '年龄'
        },
        {
          prop: 'sexLabel',
          label: '性别'
        },

        {
          prop: 'birth',
          label: '出生日期',
          width: 200
        },
        {
          prop: 'addr',
          label: '地址',
          width: 320
        }
      ],
      config: {
        page: 1,
        total: 20,
        loading: false //加载数据
      }
    }
  },
  methods: {
    // 获取用户数据列表
    getList() {
      this.config.loading = true // 数据正在加载
      this.$http
        .get('/user/getUser', {
          params: {
            page: this.config.page
          }
        })
        .then(res => {
          console.log(res)
          console.log('table:', this.tableData)
          this.tableData = res.data.list.map(item => {
            item.sexLabel = item.sex == '0' ? '女' : '男'
            return item
          })
          console.log('userTabledata:', this.tableData)
          this.config.total = res.data.count // 将获取到的总数据条数赋给config配置中的total对象属性
          this.config.loading = false // 获取完数据后，更改数据加载的状态
        })
    },
    // changePage() {
    //   // 子组件给父组件传递参数：
    //   //1、子组件绑定自定义事件
    //   //2、methods钩子函数中定义对应的自定义事件，事件中通过this.$emit(自定义参数名，要传递的参数)
    //   //3、父组件中@自定义参数名="要触发的事件名",并在钩子函数中定义对应事件名的逻辑
    //   console.log(this.config.page)
    // },
    searchHandler() {
      console.log('searching.....')
    },
    addHandler() {
      console.log('adding.....')
      this.operatForm = {}
      this.operatType = 'add'
      this.isShow = true
    },
    closeHandler() {
      this.isShow = false
    },
    // 编辑用户
    editHandler(row) {
      console.log(row)
      this.operatForm = row //当点击编辑按钮时，把table子组件中传递出来的row参数赋给该表单数据，row是代表了点击项那行数据的对象
      this.operatType = 'edit' //更改dialog标题
      this.isShow = true //显示弹窗
    },
    // 删除用户
    delHandler(row) {
      console.log(row)
      //点击删除按钮，要先弹出一个确认框，提醒用户是否是真的想删除
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http
            .get('/api/user/del', { params: { id: row.id } })
            .then(res => {
              console.log(res.data)
              this.getList()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // dialog对话框表单中的确认按钮，点击确认，判断是编辑还是添加，分别访问不同的接口
    sureClickHandler() {
      if (this.operatType === 'edit') {
        //编辑操作
        this.$http.post('/api/user/edit', this.operatForm).then(res => {
          console.log(res.data)
          this.getList()
          //关闭对话框
          this.isShow = false
        })
      } else {
        //添加操作

        console.log(this.operatForm)
        this.$http.post('/api/user/add', this.operatForm).then(res => {
          console.log(res.data)
          this.getList()
          this.isShow = false
        })
      }
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/common.scss';
// @import '@/assets/scss/common';
</style>
