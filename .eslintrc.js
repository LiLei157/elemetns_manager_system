module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 添加自定义规则
    'prettier/prettier': [
      //eslint校验不成功，error或2则报错，warn或1则警告，off或0则无提示
      'error',
      {
        singleQuote: true,
        semi: false
      }
    ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
