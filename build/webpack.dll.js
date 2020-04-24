const path = require('path'); //引入node的路径
const webpack = require('webpack');//引入webpack
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');//压缩js

const vendor = [
    'react',
    'react-dom',
    'react-router-dom',
    'mobx',
    'mobx-react',
    'axios'
];
module.exports = {
    entry: {
        vendor: vendor //分离第三方库的属性 vendor
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
        ]
    },
    output: {
        filename: '[name].dll.js', // 动态链接库输出的文件名称 | name就是entry入口名称的key值，可以有多个名字 这里是vendor
        path: path.join(__dirname, '../dist'), // 动态链接库输出路径
        libraryTarget: 'var', // 链接库(react.dll.js)输出方式 默认'var'形式赋给变量 b
        library: '[name]_library' // 全局变量名称 导出库将被以var的形式赋给这个全局变量 通过这个变量获取到里面模块
    },
    plugins: [
        new webpack.DllPlugin({
            // path 指定manifest文件的输出路径
            path: path.join(__dirname, '../dist', '[name].manifest.json'),
            name: '[name]_library' // 和library 一致，输出的manifest.json中的name值
            // context: __dirname // pinga
        })
    ]
};
