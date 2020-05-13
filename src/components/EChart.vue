<template>
  <div style="height:100%" ref="echart">
    echart
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  // props属性： 用于接收父组件传递过来的参数，这里传递的是一个图表对象
  props: {
    echartData: {
      type: Object,
      default() {
        return {
          xdata: [], //xData数组：用与保存父组件传递过来的坐标类图表的x轴说明
          series: [], //series:用于存放坐标类图表或非坐标类图表的真正的数据
          legendData: []
        }
      }
    },
    // 判断是否是带图表的坐标轴
    isxAxisChart: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    options() {
      // 计算属性：根据图表类型来决定使用哪种数据表对象
      // console.log(this.isxAxisChart ? this.test : this.normalOptions)
      return this.isxAxisChart ? this.test : this.normalOptions
    },
    // 计算属性，判断当前折叠菜单的状态
    isCollapse() {
      return this.$store.state.tab.isCollapse
    }
  },
  //对父类传递过来的props中的数据进行监听，每当有数据传递过来时，初始化图表
  watch: {
    echartData: {
      handler: function() {
        this.initChart()
      },
      deep: true
    },
    // 监听折叠菜单,这里需要使用延时，因为折叠菜单是一个动画的效果,不是立刻完成的
    isCollapse() {
      setTimeout(() => {
        this.resizeChart()
      }, 300)
    }
  },

  data() {
    return {
      echart: null,

      test: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          textStyle: {
            color: '#333'
          }
        },
        // 调整图表偏移
        grid: {
          left: '20%'
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },

        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [],
          // 配置x轴颜色， xAxis.axisLine.lineStyle
          axisLine: {
            lineStyle: {
              color: '#17b3a3'
            }
          },
          axisLabel: {
            color: '#333'
          }
        },
        yAxis: [
          {
            type: 'value',
            // 配置y轴颜色
            axisLine: {
              lineStyle: {
                color: '#17b3a3'
              }
            }
          }
        ],
        series: [],
        color: [
          '#2ec7c9',
          '#b6a2de',
          '#5ab1ef',
          '#ffb980',
          '#d87a80',
          '#8d98b3',
          '#e5cf0d',
          '#97b552',
          '#95706d',
          '#dc69aa',
          '#07a2a4',
          '#9a7fd1',
          '#588dd5',
          '#f5994e',
          '#c05050',
          '#59678c',
          '#c9ab00',
          '#7eb00a',
          '#6f5553',
          '#c14089'
        ]
      },
      // 不带坐标轴的图表
      normalOptions: {
        tooltip: {
          trigger: 'item'
        },
        color: [
          '#0f78f4',
          '#dd536b',
          '#9462e5',
          '#a6a6a6',
          '#e1bb22',
          '#39c362',
          '#3ed1cf'
        ],
        series: []
      }
    }
  },
  methods: {
    initChart() {
      this.initChartData() // 在初始化图表前，先初始化好数据作准备
      // 判断是否有初始化图表
      if (this.echart) {
        this.echart.setOption(this.options)
      } else {
        this.echart = echarts.init(this.$refs.echart)
        this.echart.setOption(this.options)
      }
    },
    initChartData() {
      // 根据图表类型初始化数据
      if (this.isxAxisChart) {
        // 如果是坐标轴类数据
        this.test.xAxis.data = this.echartData.xdata
        this.test.series = this.echartData.series
        this.test.legend.data = this.echartData.legendData
        // console.log(this.echartData.series)
      } else {
        // 不带坐标轴的图表
        console.log('else', this.echartData.series)
        this.normalOptions.series = this.echartData.series
      }
    },
    // resize()自适应
    resizeChart() {
      // 判断图表对象是否存在，如果存在触发resize()方法自适应大小
      return this.echart ? this.echart.resize() : ''
    }
  },
  mounted() {
    // 在mounted钩子函数中，添加一个resize监听事件，每监听到窗口大小改变时，就调用resizeChart回调函数
    window.addEventListener('resize', this.resizeChart)
  },
  destroyed() {
    // 当添加了window事件监听后，需要再destroyed钩子函数中移除掉，防止内存泄漏
    window.removeEventListener('resize', this.resizeChart)
  }
}
</script>

<style lang="scss" scoped></style>
