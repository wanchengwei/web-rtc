const { defineConfig } = require('@vue/cli-service')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require('compression-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production'

//正式环境不打包公共js
let externals = {}
//储存cdn的文件
let cdn = {
  css: [],
  js: []
}
//正式环境才需要
if (isProduction) {
  externals = { //排除打包的js
    echarts: 'echarts',
  }
  cdn.css = [
    'https://cdn.bootcdn.net/ajax/libs/normalize/8.0.1/normalize.min.css'
  ]
  cdn.js = [
    'https://cdn.bootcdn.net/ajax/libs/echarts/4.9.0-rc.1/echarts.min.js',
  ]
}


module.exports = defineConfig({
  publicPath: '/web-rtc',
  transpileDependencies: true,
  productionSourceMap: !isProduction, //关闭生产环境下的SourceMap映射文件 
  configureWebpack: {
    externals, //常用的公共js 排除掉，不打包 而是在index添加cdn，
    plugins: isProduction ? [
      new BundleAnalyzerPlugin(), // 分析打包大小使用默认配置       
      new CompressionPlugin(), // 开启Gzip压缩      
    ] : []
  },
  chainWebpack: config => {
    //...其它配置  
    // 注入cdn变量 (打包时会执行)
    config.plugin('html').tap(args => {
      args[0].cdn = cdn // 配置cdn给插件
      return args
    })
  }
})
