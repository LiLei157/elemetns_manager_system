<template>
  <el-row class="home" :gutter="20">
    <!--左侧-->
    <el-col :span="8">
      <!-- 左侧上面的卡片布局 -->
      <el-card shadow="hover">
        <!-- 用户信息 -->
        <div class="user">
          <img :src="userImg" />
          <div class="userinfo">
            <p class="username">Nick</p>
            <p style="color:#999">超级管理员</p>
          </div>
        </div>
        <!-- 登录地点信息 -->
        <div class="localinfo">
          <p>上次登录时间：<span>2019-12-28</span></p>
          <p>上次登录地点：<span>上海</span></p>
        </div>
      </el-card>
      <!-- 左侧下面的卡片布局 -->
      <el-card shadow="hover" style="height:522px;margin-top:20px">
        <el-table :data="tableData">
          <el-table-column
            show-overflow-tooltip
            v-for="(val, key) in tableDataTitle"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <!--右侧-->
    <el-col :span="16">
      <!-- 右侧顶部6个订单卡片 -->
      <div class="num">
        <el-card
          v-for="item in orderCountData"
          :key="item.name"
          shadow="hover"
          body-style="{padding:0}"
        >
          <i
            :class="`el-icon-${item.icon}`"
            :style="`background-color:${item.color}`"
          ></i>
          <div class="detail">
            <p class="price">
              ￥<span>{{ item.value }}</span>
            </p>
            <p>{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <!-- 右侧中间表格显示卡片 -->
      <el-card shadow="hover">
        <echart style="height:280px" :echartData="echartData.order"></echart>
      </el-card>
      <!-- 右侧底部2张卡片布局 -->
      <div class="graph">
        <el-card shadow="hover">
          <echart
            style="height:260px"
            :echartData="echartData.user"
            body-style="padding:0"
          ></echart>
        </el-card>
        <el-card shadow="hover">
          <echart
            style="height:260px"
            :echartData="echartData.viedoPie"
            :isxAxisChart="false"
          ></echart>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import Echart from '../../components/EChart'
export default {
  components: {
    Echart
  },
  created() {
    this.getResponseData() // 在每次加载数据的时候获取数据
  },
  data() {
    return {
      userImg: require('../../assets/scss/images/user.png'),
      tableDataTitle: {
        name: '课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      tableData: [], // 首页左下角表格数据
      orderCountData: [
        {
          name: '今日支付订单',
          value: '1234',
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '今日收藏订单',
          value: '210',
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '今日未支付订单',
          value: '112',
          icon: 's-goods',
          color: '#5ab1ef'
        },
        {
          name: '本月支付订单',
          value: '13000',
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '本月收藏订单',
          value: '212',
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '本月未支付订单',
          value: '112',
          icon: 's-goods',
          color: '#5ab1ef'
        }
      ],
      // 对象中放着home组件中所有的echart图表数据
      echartData: {
        //订单折线图数据
        order: {
          xdata: [], //x轴说明
          series: [],
          legendData: [] //存放每项课程的name
        },
        // 用户柱状图
        user: {
          xdata: [],
          series: []
        },
        //饼图
        viedoPie: {
          series: []
        }
      }
    }
  },
  methods: {
    getResponseData() {
      this.$http
        .get('/home/getData')
        .then(res => {
          res = res.data.data // 获取的data数据
          console.log(res)
          // 左下角图表数据
          this.tableData = res.tableData
          //折线图
          this.echartData.order.xdata = res.orderData.date
          //折线图的主要数据
          const order = res.orderData.data
          // console.log(order)
          // 第一步：取出每项数据中所有的key
          let keyarry = Object.keys(order[0])
          this.echartData.order.legendData = keyarry
          keyarry.forEach(key => {
            this.echartData.order.series.push({
              name: name === 'wechat' ? '小程序' : key,
              type: 'line',
              data: order.map(item => item[key])
            })
          })

          // //处理柱状图
          const userdata = res.userData
          // 处理柱状图中x轴数据
          const xdata = userdata.map(item => item.date)
          this.echartData.user.xdata = xdata
          this.echartData.user.series.push({
            name: '新增用户',
            type: 'bar',
            data: userdata.map(item => item.new)
          })
          this.echartData.user.series.push({
            name: '活跃用户',
            type: 'bar',
            data: userdata.map(item => item.active)
          })
          // 柱状图图例
          this.echartData.user.legendData = ['新增用户', '活跃用户']

          // 饼图处理
          // {
          //   name: 'springboot',
          //   value: Mock.Random.float(1000, 10000, 0, 2)
          // }
          const piedata = res.videoData
          // console.log(piedata)
          this.echartData.viedoPie.series.push({
            type: 'pie',
            data: piedata
          })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/home.scss';
</style>
