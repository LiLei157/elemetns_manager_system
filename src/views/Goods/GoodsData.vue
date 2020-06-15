<!--
 * @Author: your name
 * @Date: 2020-05-08 11:45:07
 * @LastEditTime: 2020-06-12 16:41:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ele-manager\src\views\Goods\GoodsData.vue
 -->
<template>
  <div class="goods-data">
    <!-- 总销量，这里柱状图来表示 -->
    <el-card class="total-sales">
      <p style="font-weight:700">各类产品总销量柱状图：</p>
      <Echarts
        style="height:450px;width:100%"
        :echartData="totalSalesEchartData"
        :isxAxisChart="true"
      ></Echarts>
    </el-card>
    <!-- 这里表示1-3月销量，4-6月销量,7-9月销量,10-12月销量，4个季度，通过折线图来表示 -->
    <el-card class="quarterly-sales">
      <p style="font-weight:700">各类产品1~4季度销量详情：</p>
      <Echarts
        style="height:550px"
        :echartData="quarterlyEchartData"
        :isxAxisChart="true"
      ></Echarts>
    </el-card>
    <!-- 这里显示所有商品种类，使用饼图来显示 -->
  </div>
</template>

<script>
import Echarts from '../../components/EChart'
export default {
  name: 'goods-data',
  data() {
    return {
      totalSalesEchartData: {
        xdata: [], // echart图表x轴数据
        series: [], // y轴数据
        legendData: [] //标记，可以通过点击标记，去显示或隐藏某条数据
      },
      quarterlyEchartData: {
        xdata: [],
        series: [],
        legendData: []
      }
    }
  },
  components: {
    Echarts
  },
  mounted() {
    this.getProductList()
    // this.getList()
    console.log('GoodsData mounted...')
  },
  methods: {
    getProductList() {
      this.$http.get('/goods/list').then(res => {
        res = res.data.data
        this.handlerTotalData(res)
        this.handlerQuarterlyData(res) // 调用处理折线图数据的方法
      })
    },
    // 处理总销量柱装图数据
    handlerTotalData(res) {
      console.log(res)
      res.map(item => {
        this.totalSalesEchartData.xdata.push(item.name) // xData数据赋值
      })
      this.totalSalesEchartData.series.push({
        type: 'bar',
        barWidth: 30,
        data: res.map(item => item.sales)
      })
      // console.log(this.totalSalesEchartData.series)
      // console.log(this.totalSalesEchartData.xdata)
    },
    // 处理1~4季度销量折线图数据
    handlerQuarterlyData(res) {
      let keyArr = Object.keys(res[0])
      let keyArr1 = []
      keyArr.map(item => {
        item === 'firstQuarterly' ? keyArr1.push(item) : ''
        item === 'secondQuarterly' ? keyArr1.push(item) : ''
        item === 'thirdQuarterly' ? keyArr1.push(item) : ''
        item === 'fourthQuarterly' ? keyArr1.push(item) : ''
      })
      // console.log(keyArr1)
      res.map(item => {
        this.quarterlyEchartData.series.push({
          name: item.name,
          type: 'line',
          data: keyArr1.map(key => item[key])
        })
      })
      // console.log(this.quarterlyEchartData.series)
      this.quarterlyEchartData.xdata = keyArr1
      res.map(item => {
        this.quarterlyEchartData.legendData.push(item.name)
      })
      console.log(this.quarterlyEchartData)
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-data {
  width: 100%;
  .total-sales,
  .quarterly-sales {
    margin-bottom: 30px;
  }
}
</style>
