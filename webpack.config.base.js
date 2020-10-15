const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const tsImportPluginFactory = require("ts-import-plugin");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");

const path = require("path");

const config = {
  // module: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: "./src/index.tsx",
  output: {
    publicPath: "/",
    path: path.join(__dirname, "dist"),
    filename: "[name].[hash:4].js",
  },
  devServer: {
    hot: true, // 热更新
    inline: true,
    stats: "errors-only",
    contentBase: path.join(__dirname, "dist"), //静态文件根目录
    historyApiFallback: {
      // browserHistory的时候，刷新会报404. 自动重定向到index.html
      index: "./index.html",
    },
  },
  resolve: {
    // 解析配置
    alias: {
      "@": path.resolve(__dirname, "src"), // @指向src
      "~": path.resolve(__dirname, "node_modules"), //~指向node_modules
    },
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/, // js, ts, tsx, jsx
        loader: "ts-loader",
        include: [path.resolve(__dirname, "src")],
        options: {
          transpileOnly: true, // 是否只转译
          // 设置自定义转换器, 定制 TS源码转换成 JS生成的代码。比如删掉代码里的注释、改变变量的名字、将类转换为函数等
          getCustomTransformers: () => ({
            // ts-import-plugin 实现按需引入antd
            before: [
              tsImportPluginFactory({
                libraryName: "antd",
                libraryDirectory: "es",
                style: "css",
                
              }),
            ],
          }),
          compilerOptions: {
            module: "es2015", //模块规范是es2015
          },
        },
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          "cache-loader",
          "style-loader",
          {
            loader: "css-loader",
            options: { importLoaders: 0 },
          },
          {
            loader: "postcss-loader", // 给 css 添加厂商前缀
            options: {
              postcssOptions: {
                plugins: [require("autoprefixer")],
              },
            },
          },
          {
            loader: "less-loader", // compiles Less to CSS
            options: {
              lessOptions: {
                modifyVars: {
                  "primary-color": "#0f0",
                  "link-color": "#5f82ff",
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "node_modules", "antd", "es"),
          path.resolve(__dirname, "node_modules", "nprogress"),
        ],
      },
      {
        test: /\.(jpg|png|gif|jpeg)$/, //处理图片,把图片打包到输出目录中
        use: ["url-loader"],
        include: [path.resolve(__dirname, "src")],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: ["@svgr/webpack", "url-loader"],
      },
    ],
  },
  optimization: {
    splitChunks: {
      //分割代码块
      cacheGroups: {
        vendor: {
          //第三方依赖
          priority: 1, //设置优先级，首先抽离第三方模块
          name: "vendor",
          test: /node_modules/,
          chunks: "initial",
          minSize: 0,
          minChunks: 1, //最少引入了1次
        },
        //缓存组
        common: {
          //公共模块
          chunks: "initial",
          name: "common",
          minSize: 100, //大小超过100个字节
          minChunks: 3, //最少引入了3次
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*", "!dll", "!dll/**"],
    }),
    new webpack.DllReferencePlugin({
      manifest: require(path.resolve(
        __dirname,
        "dist",
        "dll",
        "manifest.json"
      )),
    }),
    // new HardSourceWebpackPlugin(),
    // new webpack.HotModuleReplacementPlugin()
  ],
};

module.exports = config;
