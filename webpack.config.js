const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const tsImportPlugin = require('ts-import-plugin');
const path = require('path');

module.exports = {
  module: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devtool: 'source-map', //开发工具
  devServer: {
    hot: true, // 热更新
    contentBase: path.join(__dirname, 'dist'), //静态文件根目录
    historyApiFallback: {
      // browserHistory的时候，刷新会报404. 自动重定向到index.html
      index: './index.html',
    },
  },
  resolve: {
    // 解析配置
    alias: {
      '@': path.resolve(__dirname, 'src'), // @指向src
      '~': path.resolve(__dirname, 'node_modules'), //~指向node_modules
    },
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/, // js, ts, tsx, jsx
        loader: 'ts-loader',
        options: {
          transpileOnly: true, // 是否只转译
          // 设置自定义转换器, 定制 TS源码转换成 JS生成的代码。比如删掉代码里的注释、改变变量的名字、将类转换为函数等
          getCustomTransformers: () => ({
            // ts-import-plugin 实现按需引入antd
            before: [
              tsImportPlugin({
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: 'css',
              }),
            ],
          }),
          compilerOptions: {
            module: 'es2015', //模块规范是es2015
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 0 },
          },
          {
            loader: 'postcss-loader', // 给 css 添加厂商前缀
            options: {
              postcssOptions: {
                plugins: [require('autoprefixer')],
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 0 },
          },
          {
            loader: 'postcss-loader', // 给 css 添加厂商前缀
            options: {
              postcssOptions: {
                plugins: [require('autoprefixer')],
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif|jpeg)$/, //处理图片,把图片打包到输出目录中
        use: ['url-loader'],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: ['@svgr/webpack', 'url-loader'],
        // use: [
        //   {
        //     loader: '@svgr/webpack',
        //     options: {
        //       icon: true,
        //     },
        //   },
        // ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
