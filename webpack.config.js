const path = require('path');
const precss = require('precss');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const env = process.env;
const STATIC_PATH = 'static';
const DEV_ENV = env.DEV || false;
const MOCK_ENV = env.MOCK || false;
const HOST = env.HOST || env.npm_package_config_server_host;
const PORT = env.POST || env.npm_package_config_server_port;
const extractAntD = new ExtractTextPlugin(`${STATIC_PATH}/css/antd.css`);
const extractStyle = new ExtractTextPlugin(`${STATIC_PATH}/css/style.css`);

const config = {
    entry: {
        main: './src/index.jsx',
        vendor: ['react', 'react-dom', 'react-router']
    },
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: '/',
        filename: `${STATIC_PATH}/js/[name].js`
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
                    configFile: '.eslintrc.json'
                }
            }]
        }, {        // js加载处理
            test: /\.(js|jsx)$/,
            include: path.join(__dirname, 'src'),
            use: ['babel-loader']
        }, {        // 独立加载antd的css
            test: /\.css$/,
            include: path.join(__dirname, 'node_modules/antd/lib'),
            use: extractAntD.extract(['css-loader'])
        }, {    //项目scss加载处理
            test: /\.scss$/,
            include: path.join(__dirname, 'src'),
            use: extractStyle.extract(['css-loader', 'postcss-loader', 'sass-loader'])
        }, {    //项目css加载处理
            test: /\.css$/,
            include: path.join(__dirname, 'src'),
            use: extractStyle.extract(['css-loader', 'postcss-loader'])
        }, {    // 图片加载处理
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
        new webpack.NoEmitOnErrorsPlugin(),             // 出错不终止插件
        new CleanWebpackPlugin(['build']),              // 清除编译目录
        new webpack.DefinePlugin({                      // 配置全局变量
            'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV),
            __DEV__: DEV_ENV,
            __MOCK__: MOCK_ENV
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function () {
                    return [precss, autoprefixer];
                }
            }
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor'),
        new HtmlWebpackPlugin({
            template: 'index.html',     // 当前目录下的index.html
            filename: 'index.html'      // 生成到build目录的index.html
        })
    ],
    devtool: '#cheap-module-eval-source-map',
    devServer: {
        host: HOST,
        port: PORT,
        inline: true,
        historyApiFallback: true,    // using html5 router.
        contentBase: path.join(__dirname, "build")
    }
};

module.exports = config;