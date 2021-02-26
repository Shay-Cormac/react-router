const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 要缩小输出，可以使用像optimize-css-assets-webpack-plugin这样的插件。设置优化。minimizer覆盖了webpack提供的默认值，所以一定要指定一个JS minimizer
// https://www.npmjs.com/package/mini-css-extract-plugin   Minimizing For Production
const OptimizeCss = require('optimize-css-assets-webpack-plugin')
const UglifyjsPlugin = require('uglifyjs-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const RemoveCommentsPlugin = require('./remove-comments-plugin') // 自定义插件

module.exports = {
    mode: 'none', // "production" | "development" | "none"
    // 选择模式告诉webpack使用它的内置优化

    entry: './src/index.tsx', // string | object | array
    // 入口

    output: {
        // 出口
        // webpack 如何输出结果的相关选项

        path: path.resolve(__dirname, 'dist'), // string
        // 所有输出文件的目标路径
        // 必须是绝对路径（使用 Node.js 的 path 模块）

        filename: 'bundle.js', // string    // 「入口分块(entry chunk)」的文件名模板（出口分块？）

        publicPath: path.resolve(__dirname, 'dist'), // string    // 输出解析文件的目录，url 相对于 HTML 页面

        library: 'MyLibrary', // string,
        // 导出库(exported library)的名称

        libraryTarget: 'umd', // 通用模块定义    // 导出库(exported library)的类型

        /* 高级输出配置（点击显示） */
    },

    devtool: 'source-map',
    // 启用sourcemaps来调试webpack的输出

    resolve: {
        // 添加'.ts'和'.tsx'作为可解析扩展.
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },

    module: {
        rules: [
            // 所有带有'.ts'或'.tsx'的文件，扩展将被'awesome-typescript-loader'处理.
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },

            // 所有输出'.js'的文件会重新处理'source-map-loader'的任何sourcemaps.
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
            
            // 所有以 '.css' 结尾的文件，都将被提供给 'style-loader' 和 'css-loader'
            // { test: /\.css$/i, use: ['style-loader', 'css-loader'] },

            // es6、es7 等高级语法转变为 es5
            {test:/\.js$/, 
                use:{ 
                    loader:'babel-loader', 
                    options:{
                        // 配置预设的模块包
                        presets:[
                            '@babel/preset-env'
                        ],
                        plugins:[
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }}},
            // 使用 'mini-css-extract-plugin' 抽离单独的 .css 文件，不再放入style标签里
            // 使用 'postcss-loader' 补全css代码的兼容性前缀
            { test: /\.css$/i, use: [ MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] },
            
            // 先后使用 'markdown-loader' 和 'html-loader' 将 '.md' 文档解析成 html
            // 需要下载 'marked' 和 'html-loader',并编写使用 'markdown-loader.js' 文件
            { test: /.md$/, use: [ 'html-loader', './markdown-loader' ] }
        
        ],
    },

    optimization:{
        minimizer:[
            new UglifyjsPlugin({
                cache: true,  // 是否使用缓存
                parallel: true,   // 是否并发打包
                sourceMap: true  // 将ES6解析成ES5进行源码映射, SourceMap是一种映射关系。当项目运行后，如果出现错误，错误信息只能定位到打包后文件中错误的位置。如果想查看在源文件中错误的位置，则需要使用映射关系，找到对应的位置。
            }),
            new OptimizeCss({

            })
        ]
    },
    // 优化项，会根据你选择的 mode 来执行不同的优化， 不过所有的优化还是可以手动配置和重写。

    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    // 外部扩展，防止将某些 import 的包(package)打包到 bundle 中

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        progress: true,
        openPage: 'dist/index.html',
    },
    // 开发中的服务器配置 Server(devServer)

    plugins: [
        
        new CleanWebpackPlugin(),
        
        new HtmlWebpackPlugin({
            title: 'My App',
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css'
        }),

        new RemoveCommentsPlugin() // 自定义插件
    ],
    // 附加插件列表
};
