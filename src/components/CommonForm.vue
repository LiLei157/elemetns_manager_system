<template>
  <div>
    <!-- 封装Form表单 -->
    <el-form :model="form" ref="form" :inline="inline">
      <!-- 根据父组件传递的数据循环遍历el-form-item -->
      <el-form-item
        label-width="100px"
        v-for="item in formLabel"
        :label="item.label"
        :key="item.model"
      >
        <!-- 1、表单中普通文本类型输入 -->
        <el-input
          v-model="form[item.model]"
          v-if="!item.type"
          :placeholder="`请输入${item.label}`"
        ></el-input>
        <!-- 2、表单中select类型的输入,如果formLabel中的type类型为select时，才插入此表单域 -->
        <el-select
          v-model="form[item.model]"
          :placeholder="`请选择${item.label}`"
          v-if="item.type === 'select'"
        >
          <el-option
            v-for="optionItem in item.options"
            :key="optionItem.label"
            :label="optionItem.label"
            :value="optionItem.value"
          ></el-option>
        </el-select>
        <!-- 3、封装一个时间选择器,当type字段类型为DatePicker时(使用v-if来判断)，才选择插入此表单域 -->
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form[item.model]"
          style="width: 100%;"
          v-if="item.type === 'DatePicker'"
          value-format="yyyy-mm-dd"
        ></el-date-picker>
        <!-- 日期选择器 -->
        <!-- 4、封装一个switch开关，当type字段类型为Switch时，才选择插入此表单域 -->
        <el-switch
          v-model="form[item.model]"
          v-if="item.type === 'Switch'"
        ></el-switch>
      </el-form-item>
      <!-- 预留一个插槽slot -->
      <el-form-item><slot></slot></el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  // 封装的表单组件，数据部分是由父组件传递的
  props: {
    form: Object, // form表单对象，里面对应着每项表单域
    inline: Boolean, // inline：是否让表单成为行内表单域,默认为true
    // 表单的列表项,数组里面是一个个对象
    formLabel: Array
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
