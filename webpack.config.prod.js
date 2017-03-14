const path = require('path');
const precss = require('precss');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const STATIC_PATH = 'static';
const extractAntD = new ExtractTextPlugin(`${STATIC_PATH}/css/[contenthash].antd.css`);
const extractStyle = new ExtractTextPlugin(`${STATIC_PATH}/css/[contenthash].style.css`);

const config = {
    entry: {
        main: './src/index.jsx',
        vendor: ['react', 'react-dom', 'react-router']
    },
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: '/',
        filename: `${STATIC_PATH}/js/[chunkhash].[name].js`
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss']
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            enforce: 'pre',
            include: path.join(__dirname, 'src'),
            use: [{
                loader: 'eslint-loader',
                options: {
                    configFile: '.eslintrc.prod.json'
                }
            }]
        }, {
            test: /\.(js|jsx)$/,
            include: path.join(__dirname, 'src'),
            use: ['babel-loader']
        }, {        // 独立加载antd的scss
            test: /\.css$/,
            include: path.join(__dirname, 'node_modules/antd/lib'),
            use: extractAntD.extract(['css-loader'])
        }, {
            test: /\.scss$/,
            include: path.join(__dirname, 'src'),
            use: extractStyle.extract(['css-loader', 'postcss-loader', 'sass-loader'])
        }, {
            test: /\.css$/,
            include: path.join(__dirname, 'src'),
            use: extractStyle.extract(['css-loader', 'postcss-loader'])
        }, {
            test: /\.(png|jpg|jpeg|gif|ico)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name: `${STATIC_PATH}/images/[name].[ext]`
                }
            }]
        }]
    },
    plugins: [
        extractAntD,
        extractStyle,
        new CleanWebpackPlugin(['build']),      // 清除编译目录
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendor'),
        new webpack.DefinePlugin({              // 配置全局变量
            'process.env.NODE_ENV': JSON.stringify('production'),
            __DEV__: false,
            __MOCK__: false
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function () {
                    return [precss, autoprefixer];
                }
            }
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',     // 当前目录下的index.html
            filename: 'index.html'      // 生成到build目录的index.html
        })
    ]
};

module.exports = config;