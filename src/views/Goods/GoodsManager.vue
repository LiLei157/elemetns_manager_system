<!--
 * @Author: your name
 * @Date: 2020-01-05 16:42:51
 * @LastEditTime: 2020-05-12 14:48:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ele-manager\src\views\Goods\GoodsManager.vue
 -->
<template>
  <el-card class="el-card">
    <el-tabs type="border-card">
      <el-tab-pane label="出售中商品">
        <common-search
          @findHandler="findHandler"
          :goodsList="goodsClassifyList"
        >
          <template v-slot:button>
            <button class="button" @click="addHandler">添加商品</button>
            <button class="button">复制淘宝，京东，1688，京东</button>
          </template>
        </common-search>
        <!-- table组件 -->
        <common-table
          :tableData="saleList"
          :tableLabel="tableLabel"
          tableHeight="700"
          :config="config"
          @edit="edit"
        ></common-table>
      </el-tab-pane>

      <el-tab-pane label="仓库中商品">
        <common-search>
          <template v-slot:button>
            <button class="button">批量上架</button>
          </template>
        </common-search>
        <common-table
          :tableData="warehouseList"
          :tableLabel="tableLabel"
          :config="config"
        ></common-table>
      </el-tab-pane>

      <el-tab-pane label="已售罄商品">
        <common-search></common-search>
        <common-table
          :tableData="selloutList"
          :tableLabel="tableLabel"
          :config="config"
        ></common-table>
      </el-tab-pane>
      <el-tab-pane label="警戒库存">
        <common-search></common-search>
        <!-- <common-table></common-table> -->
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
// 引入组件
import CommonSearch from '@/components/CommonSearch'
import CommonTable from '@/components/CommonTable'

export default {
  components: {
    CommonSearch,
    CommonTable
  },
  data() {
    return {
      saleList: [], //在售商品列表,mock数据中type：1
      warehouseList: [], //仓库商品列表,把已经售罄的商品过滤掉，即已售罄的商品仓库肯定没有了
      selloutList: [], // 已售罄商品,筛选库存为0的数据
      alertinventory: [], // 警戒库存，筛选库存低于50的数据
      goodsClassifyList: [], // 商品分类
      config: {
        page: 1,
        total: 20,
        loading: true
      },
      tableLabel: [
        {
          prop: 'image',
          label: '图片',
          type: 'image',
          width: 200
        },
        {
          prop: 'label',
          label: '商品名称',
          width: 300
        },
        {
          prop: 'ficti',
          label: '虚拟销量'
        },
        {
          prop: 'stock',
          label: '库存'
        },
        {
          prop: 'sales',
          label: '销量'
        },
        {
          prop: 'status',
          label: '状态'
        }
      ],
      form: {
        classify: '',
        label: '',
        image: '',
        discribe: '',
        ficti: 0,
        keywords: '',
        price: '',
        sales: '',
        status: false,
        stock: 0,
        unit_name: ''
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.$http
        .get('/goods/list')
        .then(res => {
          console.log('list*****', res.data.data)
          let data = res.data.data
          this.renderData(data)
          console.log('saleList', this.saleList)
          console.log('warehouseList', this.warehouseList)
          console.log('saleoutList', this.saleList)
          console.log('alertinventory', this.alertinventory)
          this.config.loading = false
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 关键字查询
    findHandler(val) {
      console.log(val)
      this.$http
        .post('/goods/find', {
          keywords: val
        })
        .then(res => {
          this.saleList = res.data.data
        })
    },

    // 给data数据赋值，这里抽取成一个方法
    renderData(res) {
      console.log(res)
      this.saleList = res.filter(item => item.type === 1)
      this.warehouseList = res.filter(item => item.stock !== 0)
      this.selloutList = res.filter(item => item.stock === 0)
      this.alertinventory = res.filter(item => item.stock <= 50)
      // 这里为了简便，直接从mock列表中抽取每一项的classify
      let tmp = [] // 新建一个临时变量tmp用于暂时存放从每一个列表项中遍历出来的分类
      res.map(item => {
        tmp.push(item.classify)
      })
      tmp.map(item => {
        // 对这个临时变量tmp的每一个item进行判断：判断该item是否已在存放分类的列表goodsClassifyList中，如果在则不操作，如果不在则插入到数组
        this.goodsClassifyList.includes(item)
          ? ''
          : this.goodsClassifyList.push(item)
      })
      console.log(tmp)
      console.log(this.goodsClassifyList)
    },
    // 表格编辑按钮
    edit(row) {
      this.$router.push({
        name: 'goodsEdit',
        params: {
          row,
          classifyList: this.goodsClassifyList
        }
      })
    },
    addHandler() {
      this.$router.push({
        name: 'goodsEdit',
        params: {
          classifyList: this.goodsClassifyList,
          form: this.form
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  border: 0;
  outline: none;
  color: #fff;
  background-color: $sureBtn-color;
  margin-right: 10px;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 2px;
  cursor: pointer;
  transition: all 1s;
}
.button:hover {
  background-color: #0092dc;
  transition: all 1s;
}
.el-card {
  width: 100%;
}
</style>
