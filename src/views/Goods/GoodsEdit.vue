<!--
 * @Author: your name
 * @Date: 2020-05-11 20:30:10
 * @LastEditTime: 2020-06-12 16:41:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ele-manager\src\views\Goods\GoodsEidt.vue
 -->
<template>
  <div class="edit">
    <div class="header">
      <span v-if="row">商品编辑</span>
      <span v-if="!row">商品新增</span>
      <el-button
        size="mini"
        style="margin-left:20px;vertical-align:middle"
        @click="backHandler"
        >返回列表</el-button
      >
    </div>
    <!-- 商品编辑 -->
    <template v-if="row">
      <el-tabs v-model="activeName">
        <el-tab-pane label="基础信息" name="first">
          <Form :form="row" :formData="formData">
            <template v-slot:button>
              <el-button @click="saveHandler(2)">保存</el-button>
              <el-button type="primary" @click="nextHandler">下一步</el-button>
            </template>
          </Form>
        </el-tab-pane>
        <el-tab-pane label="商品详情" name="second">商品详情</el-tab-pane>
        <el-tab-pane label="其他设置" name="third"> </el-tab-pane>
      </el-tabs>
    </template>

    <!-- 商品添加 -->
    <template v-if="form">
      <el-tabs v-model="activeName">
        <el-tab-pane label="基础信息" name="first">
          <Form :form="form" :formData="formData">
            <template v-slot:button>
              <el-button @click="saveHandler(1)">保存</el-button>
              <el-button type="primary" @click="nextHandler">下一步</el-button>
            </template>
          </Form>
        </el-tab-pane>
        <el-tab-pane label="商品详情" name="second">商品详情</el-tab-pane>
        <el-tab-pane label="其他设置" name="third">
          <Form
            style="position:relative"
            :formData="formOtherData"
            :form="formOther"
            :inline="false"
          >
            <template v-slot:yj_settings>
              <div style="background-color:#bce8fe">
                此部分功能待后续完成.....
              </div>
            </template>
            <template v-slot:button>
              <el-button>保存</el-button>
              <el-button>上一步</el-button>
            </template>
          </Form>
        </el-tab-pane>
      </el-tabs>
    </template>
    <div class="loading-box" v-show="loading">
      <img src="images/loading-svg/loading-bars-skyblue.svg" alt="" />
    </div>
  </div>
</template>

<script>
import Form from '@/components/Form'
export default {
  data() {
    return {
      row: {},
      form: {},
      classifyList: this.$route.params.classifyList,
      loading: false,
      activeName: 'first',
      formData: [
        {
          label: '商品分类',
          type: 'select',
          model: 'classify',
          options: [],
          multiple: true
        },
        {
          label: '商品名称',
          type: 'text',
          model: 'label'
        },
        {
          label: '商品关键字',
          type: 'text',
          model: 'keywords'
        },
        {
          label: '单位',
          type: 'text',
          model: 'unit_name'
        },
        {
          label: '商品描述',
          type: 'textarea',
          model: 'discribe'
        },
        {
          label: '图片url',
          type: 'text',
          model: 'image'
        },
        {
          label: '商品状态',
          type: 'radio',
          model: 'status',
          options: [
            {
              label: '上架'
            },
            {
              label: '下架'
            }
          ]
        }
      ],
      formOther: {
        sels: '0',
        jifen: '0.00',
        order: '',
        yj_setting: '1',
        hotsales: '1', //热卖
        discount: '1', // 促销
        jp: '1', //精品
        first_xp: '1', //首发新品
        yp_tj: '1', // 优品推荐
        yxj: []
      },
      formOtherData: [
        {
          type: 'text',
          label: '虚拟销量：',
          model: 'sels'
        },
        {
          type: 'text',
          label: '积分：',
          model: 'jifen'
        },
        {
          type: 'text',
          label: '排序：',
          model: 'order'
        },
        {
          type: 'radio',
          label: '佣金设置：',
          model: 'yj_setting',
          options: [
            {
              label: '单独设置',
              name: '1'
            },
            {
              label: '默认设置',
              name: '2'
            }
          ]
        },
        {
          type: 'radio',
          label: '热卖单品：',
          model: 'hotsales',
          options: [
            {
              label: '开启',
              name: '1'
            },
            {
              label: '关闭',
              name: '2'
            }
          ]
        },
        {
          type: 'radio',
          label: '促销单品：',
          model: 'discount',
          options: [
            {
              label: '开启',
              name: '1'
            },
            {
              label: '关闭',
              name: '2'
            }
          ]
        },
        {
          type: 'radio',
          label: '精品推荐：',
          model: 'jp',
          options: [
            {
              label: '开启',
              name: '1'
            },
            {
              label: '关闭',
              name: '2'
            }
          ]
        },
        {
          type: 'radio',
          label: '首发新品：',
          model: 'first_xp',
          options: [
            {
              label: '开启',
              name: '1'
            },
            {
              label: '关闭',
              name: '2'
            }
          ]
        }
      ],
      rules: {}
    }
  },
  components: {
    Form
  },
  mounted() {
    console.log('GoodsEdit mounted...')
    this.row = this.$route.params.row
    this.form = this.$route.params.form
    console.log(this.row)
    this.formData.map(item => {
      item.type === 'select' ? (item.options = this.classifyList) : ''
    })
    this.handlerRow()
  },
  methods: {
    handlerRow() {
      if (this.row) {
        // 获取从商品管理页中传递过来的某一行的数据,需要对classify分类抽取出来，并且更改数据类型为array，用于存放多选的内容
        this.row = this.$route.params.row
        this.row.classify = []
      }
    },
    saveHandler(type) {
      this.loading = true
      if (type === 1) {
        this.$http
          .post('/goods/add', {
            form: this.form
          })
          .then(res => {
            console.log(this.form)
            console.log(res)
            setTimeout(() => {
              this.loading = false
              this.$router.push({ name: 'goodsManager' })
            })
          }, 3000)
      }
    },
    nextHandler() {
      this.activeName = 'second'
    },
    backHandler() {
      this.$router.push({ name: 'goodsManager' })
    }
  }
}
</script>

<style lang="scss" scoped>
.edit {
  background-color: #fff;
  padding: 10px 20px;
  .header {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #f6f6f6;
  }
  .loading-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 70px;
    }
  }
}
</style>
