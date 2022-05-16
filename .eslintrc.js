module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'semi': 0, //检查分号
    "space-before-function-paren": 0, //函数名称或function关键字与开始参数之间缺少空格
    "camelcase": 0, //取消驼峰校验
    "comma-spacing": 0, //取消逗号后面空格校验
    // "comma-dangle": 0, //取消最后一项数据逗号校验
    "no-trailing-spaces": 0, //取消多余空格校验
    "quotes": 0, //取消单双引号校验
    "no-multi-spaces": 0,
    "no-multiple-empty-lines": 0, //关闭多余行校验
    "eol-last": 0, //关闭文件结尾行校验
    "space-before-blocks": 0, //关闭左括号前空格校验
    "vue/multi-word-component-names": 0, //关闭vue组件名必须多单词校验
    "no-unused-vars": 0, //关闭无用变量检测
    "comma-dangle": 0, //
  }
}
