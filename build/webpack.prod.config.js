const path = require('path'); //引入node的路径
const WebpackHtmlPlugin = require('html-webpack-plugin');//处理html
const Webpack = require('webpack');//引入webpack
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//抽离css的插件
const HappyPack = require('happypack');//开启多进程 优化webpack
const os = require('os'); // node 提供的系统操作模块  / 配合happypack插件用
// 根据我的系统的内核数量 指定线程池个数 也可以其他数量
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});//获取CPU数量
const CopyWebpackPlugin = require('copy-webpack-plugin');//复制粘贴文件插件

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');//压缩js
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');//压缩css


module.exports = { 
    //关闭 webpack 的性能提示
    // performance: {
    //     hints:false
    // }

    performance: {
        hints: 'warning', // 枚举 // waring | error | fasle 有性能问题时输出警告或错误或关闭警告
        maxAssetSize: 30000000, // 整数类型（以字节byte为单位）// 最大文件大小
        maxEntrypointSize: 50000000, // 整数类型（以字节为单位）// 最大入口文件大小
        assetFilter: function(assetFilename) {// 过滤要检查的文件
        // 提供资源文件名的断言函数
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        
        }
    },


    mode: 'production',
    //源码映射，在development环境中使用

    devtool: 'none',

    // webpack使用的根目录，string类型必须是绝对路径
    context: path.resolve(__dirname, '..'),

    entry: {
        main: './client/app'
    },
    output: {
        //打包文件名
        filename: 'js/[name].[chunkhash:8].js',
        //打包路径
        path: path.resolve(__dirname,'../dist'),
        //chunk名
        chunkFilename: 'js/chunk.[name].[chunkhash:8].js',
        // publicPath: 'http://localhost:8080'
        //公共路径
        publicPath: '/'
    },

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    warnings: false,
                    compress: {
                        drop_debugger: true,
                        drop_console: false
                    }
                }
            })
        ],
        splitChunks: { 
            chunks: 'all',         //插件的作用范围 代码块类型 必须三选一： "initial"（初始化） | "all"(默认就是all) | "async"（动态加载|按需加载） 
            minSize: 30000,                // 最小尺寸，默认0 超过30kb才会打包
            minChunks: 1,              // 最小 chunk ，默认1 最新引入第三方库
            maxAsyncRequests: 5,       // 最大异步请求chunks数， 默认1
            maxInitialRequests: 3,     // 最大初始化请求书(chunks)，默认1
            automaticNameDelimiter: '.', //如果不指定name，自动生成name的分隔符（'runtime.[name]'）
            name: true,  //split的chunks name            
            // name: () => {},            // 名称，此选项课接收 function
        
            cacheGroups: {                // 缓存组 会继承splitChunks的配置，但是test、priorty和reuseExistingChunk只能用于配置缓存组。
                //priority: "0",              // 缓存组优先级 false | object |
                vendor: {     // 将第三方模块提取出来   // key 为entry中定义的 入口名称  | split 'node_modules'目录下被打包的代码到'js/vendor.js && .css' 没找到可打包文件的话，则没有
                    
                    chunks: 'initial',        // 必须三选一： "initial"(初始化) | "all" | "async"(默认就是异步)  || 左右是入口文件
                    //test: /react|lodash/,     // 正则规则验证，如果符合就提取 chunk
                    test: /[\\/]node_modules[\\/]/,     //过滤打包node_modules文件下的库
                    name: 'vendor',           // 要缓存的 分隔出来的 chunk 名称
                    //minSize: 0,
                    minChunks: 1,            //最小引入数1
                    enforce: true,
                    priority: -10           //优先级
                    //reuseExistingChunk: true   // 可设置是否重用已用chunk 不再创建新的chunk
                }
            }
        },
        runtimeChunk: { //运行时需要打包的js文件
            name: 'mainfest'
        }
    },
    
    //模块
    module: {
        rules: [// 规则
            // 处理图片
            {
                test: /\.(png|jpe?g|gif|svg|ttf|woff2|woff)(\?.*)?$/,
                exclude: /node_modules/,
                use: [
                    {
                        // loader: 'file-loader',
                        loader: 'url-loader',
                        options: {
                            limit: 2048, //当图片小于2k以内 以base64格式 打包进js
                            name: 'images/[hash:8].[name].[ext]' //2048之外的图片的名字 =》=> 用file-loader 产生图片
                            //outputPath: 'img/', //图片产出路径
                            //outputPath: path.resolve(__dirname,'img'), //不行
                            //
                            //publicPath: "fonts/",
                            //outputPath: "fonts/"              
            
                        }
                    }
                ]
            },
            // 处理字体
            {
                test: /\.(woff|eot|ttf|otf)(\?.*)?$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                // loader: 'url-loader',
                options: {
                    limit: 10000, // ?
                    name: 'fonts.[name].[ext]'
                }
             
            },
        
            // css 处理
            {
                test: /\.css$/,
                include: [
                    path.resolve(__dirname,'../client')
                ],
                use: [
                    // 'style-loader',
                    // {
                    //     loader: 'style-loader',
                    //     options: {
                    //         insertAt: 'top', // 样式插入到<head>
                    //         singleton: true  // 将所有style标签合并成一个
                    //     }
                    // },
                    {
                        loader: MiniCssExtractPlugin.loader
                        // options: { // 解决再prod环境背景图片加载不出来的情况
                        //     publicPath: '../'
                        // }
                    },
                    'css-loader',
                    'postcss-loader'
                ]
            },
            //less 处理
            {
                test: /\.less$/,
                include: [
                    path.resolve(__dirname,'../node_modules/antd'),
                    path.resolve(__dirname,'../client')
                ],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                        // options: {
                        //     publicPath: '../'
                        // }
                    },
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            // sourceMap: true,
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'happypack/loader?id=js'
                //include: path.resolve(__dirname, '../client') // 自个加的
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'], //优先去找js文件
        alias: {
            '@': path.resolve(__dirname, '..', 'client'),
            '@c': path.resolve(__dirname, '..', 'client/config'),
            '@page': path.resolve(__dirname, '..', 'client/container'),
            '@utils': path.resolve(__dirname, '..', 'client/utils'),
            '@coms': path.resolve(__dirname, '..', 'client/container/components')
        }
    },

    plugins: [
     
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../client/lib'),//复制来自的位置
                to: path.resolve(__dirname, '../dist/lib')  // 粘贴到dist文件下lib
            }
        ]),
        
        new Webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('../dist/vendor.manifest.json')
        }),
        new WebpackHtmlPlugin({
            // favicon: './client/favicon.png',
            template: './client/index.html',
            filename: 'index.html', //打包后的名字
            title: 'myself',
            // chunks: ['index'],
            // chunks: ['','index'],
            inject: true,// 是否自动添加资源引入
            minify: {// 当 mode: 'production'时   启动html压缩 => 对html 进行压缩  / 
                // html5: true,
                removeAttributeQuotes: true, //删除引号，删除不需要的引号值
                collapseWhitespace: true, //去除空格
                removeComments: true //去除注释
                // removeRedundantAttributes: true, // 删除多余属性
                // removeEmptyAttributes: true, // 去除空属性
                // preserveLineBreaks: false,
                // minifyCSS: true,
                // minifyJS: true

            }
            //hash: true, // 给引入的文件添加哈希戳

        }),
        new MiniCssExtractPlugin({  // 抽离css文件
            //文件命名
            filename: 'css/main.css',  // 
            //打包完文件的存放地址
            chunkFilename: 'css/[name].[contenthash:8].css'
            // filename: 'main.css'
        }),
        new HappyPack({  // 基础参数设置
            id: 'js',  // 上面loader?后面指定的id
            loaders: [{
                loader: 'babel-loader?cacheDirectory=true'
            }],
            //共享进程
            threadPool: happyThreadPool,
            //允许输出日志
            verbose: true
        }),
        new OptimizeCSSPlugin()  // 压缩css
    ]
};
