const path = require('path'); 
const WebpackHtmlPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack');
const os = require('os'); 
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});
const CopyWebpackPlugin = require('copy-webpack-plugin');
// 上海市杨浦区兰州路金鹏花园1100号东区2号楼1506室
module.exports = { 
    mode: 'development',

    devtool: 'cheap-module-eval-source-map', 

    //开发服务配置
    devServer: {
        contentBase: path.resolve(__dirname,'../dist'), // 配置DevServer HTTP服务器的文件根目录
        port: 3000,
        host: 'localhost'

        // hot: true, // 是否开启模板热替换功能
        // https: true, // 是否开启HTTPS模式
        // watchContentBase: true, // 监听内容目录下的文件变化，比如html
        // compress: true, // 是否开启gzip压缩
        // historyApiFallback: true, // 是否开发HTML5 history API网页
        // proxy: { // 代理到后端的服务接口
        //     './api': 'http://localhost:3000'
        // }
    },

   
    context: path.resolve(__dirname, '..'),

    entry: {
        main: './client/app'
    },

    output: {
       
        filename: 'boundle.[hash:5].js',
        
        path: path.resolve(__dirname,'../dist'),
        
        publicPath: '/',
        
        chunkFilename: 'js/chunk.[name].js'
       
    },

    // 配置输出代码的运行环境
    // target: 'web',// 浏览器 默认
    // target: 'webworker',// WebWorker
    // target: 'node',//Node.js 使用`require`语句加载Chunk代码
    // target: 'async-node',//Node.js 异步加载Chunk代码
    // target: 'node-webkie',//nw.js 
    // target: 'electron-main',//electron 主线程
    // target: 'electron-renderer',//electron 渲染线程

    // externals: {// 使用来自JavaScript运行环境提供的全局变量
    //     jquery: 'jQery'
    // },

    // stats: { // 控制台输出日志控制
    //     assets: true,
    //     colors: true,
    //     errors: true,
    //     errorDetails: true,
    //     hash: true
    // }

    // profile: true, // 是否捕捉webpack构建的性能信息，用于分析什么原因导致构建性能不佳
    // cache: false, // 是否开启用缓存提升构建速度
    // watch: true,
    // watchOptions: { // 监听模式选项
    //     // 不监听的文件或文件夹，支持正则匹配。默认为空
    //     ignored: /node_modules/,
    //     // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
    //     // 默认300ms
    //     aggregateTimeout: 300, 
    //     // 判断文件是否发生变化是不停的去询问系统指定文件有没有变化，默认每秒询问1000次
    //     poll: 1000
    // },


    optimization: {
        splitChunks: { 
            chunks: 'all',   
            minSize: 30000,              
            minChunks: 1,            
            maxAsyncRequests: 5,    
            maxInitialRequests: 3,    
            automaticNameDelimiter: '.', 
            name: true,  
            cacheGroups: {          
                vendor: {    
                    chunks: 'initial',      
                    test: /[\\/]node_modules[\\/]/,   
                    name: 'vendor',       
                    minChunks: 1,           
                    enforce: true,
                    priority: -10          
                }
               
            }
        },
        runtimeChunk: { 
            name: 'mainfest'
        }
    },
    
    //模块
    module: {
        rules: [// 规则
           
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                exclude: /node_modules/,
                use: [
                    {
                      
                        loader: 'url-loader',
                        options: {
                            limit: 2048, 
                            name: 'images/[hash:5].[name].[ext]'     

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
                    limit: 10000,
                    name: 'fonts.[name].[ext]'
                }
             
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel-loader', 'eslint-loader']
            },
            // 处理js
            // {
            //     test: /\.js$/,
            //     use: {
            //         loader: 'babel-loader?cacheDirectory',
            //         options: {//用babel-loader 需要把es6 => es5 
            //             presets: [ 
            //                 '@babel/preset-env',
            //              ],
            //              plugins: [
            //                 ["@babel/plugin-proposal-decorators", { "legacy": true }],
            //                 // ["@babel/plugin-proposal-class-properties"],
            //                 ["@babel/plugin-proposal-class-properties", { "loose" : true }],
            //                 '@babel/plugin-transform-runtime'
            //             ]
            //         }
            //     },
            //     exclude: /node_modules/,
            //     include: path.resolve(__dirname,'src')
            // },
            // css 处理
            {
                test: /\.css$/,
                include: [
                    path.resolve(__dirname,'../client'),
                    path.resolve(__dirname,'../node_modules/braft-editor')
                ],
                use: [
                    MiniCssExtractPlugin.loader,
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
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
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

        // symlinks: true, // 是否跟随文件软链接去搜索模块的路径
        // descriptionFiles: ['package.json'], // 模块的描述文件
        // mainFields: ['main'], // 模块的描述文件里的描述入口的文件的字段名称
        // enforceExtension: false //是否强制导入语句必须要写明文件后缀

    },

    plugins: [
        // new CleanWebpackPlugin('./dist'),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../client/lib'),//复制来自的位置
                to: path.resolve(__dirname, '../dist/lib')  // 粘贴到dist文件下lib
            }
        ]),
        new Webpack.NamedModulesPlugin(), //HMR在更新时控制台显示正确的文件名
        new Webpack.NoEmitOnErrorsPlugin(), //当编译出错时 跳过输出阶段 确保资源输出不会包含错误
        new Webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('../dist/vendor.manifest.json')//名字要一致
        }),
        new WebpackHtmlPlugin({
            // favicon: './client/favicon.png',
            template: './client/index.html',
            filename: 'index.html', //打包后的文件名称
            title: 'myself',
            // chunks: ['index'],
            // chunks: ['commons', index'],// 添加splitChunks下commons中的namex值'commons'
            inject: true// 是否自动添加资源引入 eg:引入打包后的css js ...
            // minify: {// 当 mode: 'production'时   启动html压缩 => 对html 进行压缩
            //     removeAttributeQuotes: true, //删除引号，删除不需要的引号值
            //     collapseWhitespace: true, //去除空格
            //     removeComments: true, //去除注释
            // },
            //hash: true, // 给引入的文件添加哈希戳

        }),
        
        // 如果有两个页面则再加一个WebpackHtmlPlugin
        // new WebpackHtmlPlugin({
        //     // favicon: './client/favicon.png',
        //     template: './client/search.html',
        //     filename: 'search.html', //打包后的文件名称
        //     title: 'myself',
        //     // chunks: ['search'],
        //     inject: true,// 是否自动添加资源引入 eg:引入打包后的css js ...
        //     // minify: {// 当 mode: 'production'时   启动html压缩 => 对html 进行压缩
        //     //     removeAttributeQuotes: true, //删除引号，删除不需要的引号值
        //     //     collapseWhitespace: true, //去除空格
        //     //     removeComments: true, //去除注释
        //     // },
        //     //hash: true, // 给引入的文件添加哈希戳

        // }),

        new MiniCssExtractPlugin({  // 抽离css文件
            //文件命名
            filename: 'css/main.css',  // 
            //打包完文件的存放地址
            chunkFilename: 'css/[name].css'
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
        // 配置eslint
        new Webpack.LoaderOptionsPlugin({
            options: {
                eslint: {
                    configFile: path.resolve(__dirname, '../.eslintrc')
                }
            }
        })
    ]
};
