var path = require('path')
var webpack = require('webpack')
var htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 入口
  entry: path.join(__dirname, './src/js/main.js'),

  // 出口
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },

  // webpack-dev-server
  devServer: {
    // 自动开启浏览器
    open: true,
    // 指定端口号
    port: 3000,
    // 指定首次打开页面的路径
    contentBase: './src',
    // 1 热更新
    hot: true
  },

    // 有利于开发期间定位错误信息
    devtool: '#eval-source-map',

  // 通过配置 module ，来指定webpack处理非JS资源的loader
  module: {
    rules: [
      // test：用来匹配文件
      // use： 用来指定使用哪个loader处理这个类型的文件
      // '../css/index.css'
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // sass 预编译的css语言，包含两个文件后缀：scss/sass，但是都是通过 sass-loader 来处理
      {
        test: /\.(scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },

      // 处理 图片
      {
        test: /\.(jpg|jpeg|bmp|gif|png)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }
      },
      // 处理字体
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: 'file-loader'
      },
      // js 文件（ES6高级语法）
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },

      // 处理单文件组件
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },

  plugins: [
    // 2 热更新
    new webpack.HotModuleReplacementPlugin(),

    // 在 plugins 中配置 html-webpack-plugin 插件，自动引入js等
    new htmlWebpackPlugin({
      // 指定模板
      template: path.join(__dirname, './src/index.html')
    })
  ]
}