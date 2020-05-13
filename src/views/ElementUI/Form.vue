<!--
 * @Author: your name
 * @Date: 2020-05-02 14:39:30
 * @LastEditTime: 2020-05-03 20:06:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ele-manager\src\views\ElementUI\Element.vue
 -->
<template>
  <div class="element">
    <div class="left">
      <el-card shadow="hover" class="input">
        <div class="title">文本类输入框</div>
        <div class="content">
          <el-input placeholder="请输入标题"></el-input>
          <p>带前缀的input</p>
          <el-input placeholder="请输入网址">
            <template slot="prepend">https:</template>
          </el-input>
          <p>带后缀的input</p>
          <el-input placeholder="请输入网址">
            <template slot="append">.com</template>
          </el-input>
          <p>可选前缀后缀输入框</p>
          <el-input
            placeholder="请输入内容"
            v-model="input"
            class="input-with-select"
          >
            <el-select
              v-model="select"
              slot="prepend"
              placeholder="请选择"
              style="width:100px"
            >
              <el-option label="https://" value="1"></el-option>
              <el-option label="http://" value="2"></el-option>
            </el-select>
            <el-select
              v-model="select"
              slot="append"
              placeholder="请选择"
              style="width:90px"
            >
              <el-option label=".com" value="1"></el-option>
              <el-option label=".cn" value="2"></el-option>
            </el-select>
          </el-input>
        </div>
      </el-card>
      <el-card shadow="hover" class="input" style="margin:20px 0">
        <div class="title">其他类型输入框</div>
        <div class="content">
          <p>下拉框</p>
          <el-select v-model="selected1" style="margin-right:20px">
            <el-option value="北京">北京</el-option>
            <el-option value="上海">上海</el-option>
            <el-option value="深圳">深圳</el-option>
            <el-option value="广州">广州</el-option>
          </el-select>
          <el-select v-model="selected2">
            <el-option value="北京" disabled>北京</el-option>
            <el-option value="上海">上海</el-option>
            <el-option value="深圳" disabled>深圳</el-option>
            <el-option value="广州">广州</el-option>
          </el-select>
          <p>单选框</p>
          <template>
            <el-radio v-model="radio" label="1">男</el-radio>
            <el-radio v-model="radio" label="2">女</el-radio>
            <el-radio v-model="radio" label="3" disabled>中性</el-radio>
          </template>
          <p>按钮样式单选框</p>
          <div>
            <el-radio-group v-model="radioBtn">
              <el-radio-button label="上海"></el-radio-button>
              <el-radio-button label="北京"></el-radio-button>
              <el-radio-button label="广州"></el-radio-button>
              <el-radio-button label="深圳"></el-radio-button>
            </el-radio-group>
          </div>
          <p>多选框</p>
          <template>
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="复选框 A"></el-checkbox>
              <el-checkbox label="复选框 B"></el-checkbox>
              <el-checkbox label="复选框 C"></el-checkbox>
              <el-checkbox label="禁用" disabled></el-checkbox>
              <el-checkbox label="选中且禁用" disabled></el-checkbox>
            </el-checkbox-group>
          </template>
          <p>switch开关</p>
          <el-switch
            style="display:inline"
            v-model="value"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
          <el-switch
            style="display: inline;margin-left:40px"
            v-model="val"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="value1"
            inactive-text="value2"
          ></el-switch>
        </div>
      </el-card>
    </div>

    <el-card shadow="hover" class="right" style="margin-left:10px">
      <div class="title">
        <span>通用类型表单组件，根据传参来定义表单域</span>
      </div>
      <Form :form="form" :formData="formData">
        <template v-slot:button>
          <el-button type="primary">立即提交</el-button>
          <el-button>重置</el-button>
        </template>
      </Form>
    </el-card>
  </div>
</template>

<script>
import Form from '@/components/Form'
export default {
  data() {
    return {
      input: '',
      select: '',
      selected1: '',
      selected2: '',
      radio: '1',
      radioBtn: '1',
      val: true,
      checkList: ['选中且禁用', '复选框 A'],
      value: true,
      option: [
        {
          label: 'https://',
          value: '1'
        },
        {
          label: 'http://',
          value: '2'
        }
      ],
      //Form
      form: {
        name: '',
        classify: '',
        date: '',
        time: '',
        hobby: [],
        isMarry: false,
        title: '',
        info: ''
      },
      formData: [
        {
          label: '员工姓名：',
          type: 'text',
          model: 'name'
        },
        {
          label: '技术工种：',
          type: 'select',
          model: 'classify',
          placeholder: '请输入工种',
          options: [
            {
              label: '前端工程师',
              value: '1'
            },
            {
              label: 'Node.js工程师',
              value: '2'
            },
            {
              label: 'PHP工程师',
              value: '3'
            },
            {
              label: 'Java工程师',
              value: '4'
            },
            {
              label: '运维',
              value: '5'
            },
            {
              label: '视觉设计师',
              value: '6'
            }
          ]
        },
        {
          label: '工作日期选择',
          type: 'date',
          placeholder: '请选择日期',
          model: 'date'
        },
        {
          label: '时间选择选择',
          type: 'time',
          placeholder: '请输入时间',
          model: 'time'
        },
        {
          label: '兴趣爱好：',
          type: 'checkbox',
          model: 'hobby',
          options: [
            {
              label: '写作',
              name: 'type'
            },
            {
              label: '阅读',
              name: 'type'
            },
            {
              label: '代码',
              name: 'type'
            },
            {
              label: '做梦',
              name: 'type'
            }
          ]
        },
        {
          label: '是否婚姻：',
          type: 'switch',
          model: 'isMarry'
        },
        {
          label: '职称：',
          type: 'radio',
          model: 'title',
          options: [
            {
              label: '经理'
            },
            {
              label: '主管'
            },
            {
              label: '码农'
            },
            {
              label: '端水'
            }
          ]
        },
        {
          type: 'textarea',
          label: '其他信息：',
          model: 'info'
        }
      ]
      // rules: {
      //   name: [
      //     { required: true, message: '请输入姓名', trigger: 'blur' },
      //     { mix: 2, max: 5, message: '长度在3到5个字符', trigger: 'blur' }
      //   ],
      //   classify: [
      //     {
      //       required: true,
      //       message: '请输入工种',
      //       trigger: 'change'
      //     }
      //   ],
      //   date: [
      //     {
      //       type: 'date',
      //       required: true,
      //       message: '请选择日期',
      //       trigger: 'change'
      //     }
      //   ],
      //   time: [
      //     {
      //       type: 'time',
      //       required: true,
      //       message: '请输入时间',
      //       trigger: 'change'
      //     }
      //   ]
      // }
    }
  },
  components: {
    Form
  }
}
</script>

<style lang="scss" scoped>
.element {
  display: flex;
  justify-content: space-between;
  .left,
  .right {
    flex: 1;
  }
  .left {
    .title {
      height: 25px;
      line-height: 25px;
      margin-bottom: 10px;
      text-align: center;
      font-weight: 100;
      display: block;
      color: #999;
    }
    .input {
      .content {
        p {
          height: 35px;
          line-height: 35px;
          color: #999;
          font-weight: 100;
        }
      }
    }
  }
  .right {
    .title {
      text-align: center;
    }
  }
}
</style>
