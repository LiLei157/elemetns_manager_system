<!--
 * @Author: your name
 * @Date: 2020-05-03 15:57:01
 * @LastEditTime: 2020-05-14 09:03:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ele-manager\src\components\Table.vue
 -->
<template>
  <div class="table">
    <el-form
      :data="formData"
      :model="form"
      label-width="150px"
      :inline="inline"
    >
      <el-form-item
        v-for="item in formData"
        :key="item.prop"
        :inline="true"
        :label="item.label"
      >
        <!-- type类型为text时为输入框类型 -->
        <el-input
          v-model="form[item.model]"
          v-if="item.type === 'text'"
        ></el-input>

        <!-- type类型为select时，为下拉框类型 -->
        <el-select
          v-model="form[item.model]"
          :multiple="item.multiple"
          v-if="item.type === 'select'"
          :placeholder="item.placeholder"
        >
          <el-option
            v-for="(subitem, subIndex) in item.options"
            :key="subIndex"
            :label="subitem.label ? subitem.label : subitem"
            :value="subitem.value ? subitem.value : subitem"
          ></el-option>
        </el-select>
        <!-- 下拉多选框 -->

        <!-- type类型是date时，为日期选择器,type类型是date是time时，是时间选择器 -->
        <el-col :span="11">
          <el-date-picker
            v-if="item.type === 'date'"
            type="date"
            :placeholder="item.placeholder"
            v-model="form[item.model]"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="11">
          <el-time-picker
            v-if="item.type === 'time'"
            :placeholder="item.placeholder"
            v-model="form[item.model]"
          >
          </el-time-picker>
        </el-col>
        <!-- type类型为checkbox时，为多选框 -->
        <el-checkbox-group
          v-model="form[item.model]"
          v-if="item.type === 'checkbox'"
        >
          <el-checkbox
            v-for="(childItem, childIndex) in item.options"
            :key="childIndex"
            :label="childItem.label"
            :name="childItem.name"
          ></el-checkbox>
        </el-checkbox-group>
        <!-- type类型为switch时，为滑动开关 -->
        <el-switch
          v-model="form[item.model]"
          v-if="item.type === 'switch'"
        ></el-switch>

        <template v-if="item.type === 'radio' && item.model !== 'yj_setting'">
          <el-radio
            v-for="(subitem, subindex) in item.options"
            v-model="form[item.model]"
            :label="subitem.label"
            :key="subindex"
            >{{ subitem.label }}</el-radio
          >
        </template>

        <template v-if="item.type === 'radio' && item.model === 'yj_setting'">
          <el-radio
            v-for="(subitem, subindex) in item.options"
            v-model="form[item.model]"
            :label="subitem.label"
            :key="subindex"
            >{{ subitem.label }}</el-radio
          >
          <el-form-item>
            <slot name="yj_settings"></slot>
          </el-form-item>
        </template>

        <!-- type类型是textarea时，为文本域 -->
        <el-input
          :type="item.type"
          v-if="item.type === 'textarea'"
          resize="none"
          v-model="form[item.model]"
        ></el-input>
        <!-- 按钮，因为应用场景不一样，逻辑也不一样，所以这里使用slot更灵活 -->
      </el-form-item>
      <el-form-item><slot name="button"></slot></el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object
    },
    formData: Array,
    inline: Boolean
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped></style>
