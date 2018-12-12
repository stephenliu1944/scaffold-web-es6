import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import { project } from './package.json';

const ROOT_PATH = (project.rootPath && `${project.rootPath}/`) || '';
const ASSETS_PATH = ROOT_PATH + 'assets';

export default {
    entry: {
        main: ['./src/index.js']
    },
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'build'),
        filename: `${ASSETS_PATH}/js/[name].[chunkhash].js`,
        chunkFilename: `${ASSETS_PATH}/js/[name].[chunkhash].js`    // chunk js file
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss'],
        alias: {
            styles: path.resolve(__dirname, 'src/styles/'),
            utils: path.resolve(__dirname, 'src/utils/'),
            images: path.resolve(__dirname, 'src/images/'),
            constants: path.resolve(__dirname, 'src/constants/'),
            services: path.resolve(__dirname, 'src/services/'),
            commons: path.resolve(__dirname, 'src/commons/'),
            containers: path.resolve(__dirname, 'src/containers/'),
            config: path.resolve(__dirname, 'src/config/')
        }
    },
    optimization: {
        // splitChunks: {
        //     minSize: 10,
        //     minChunks: 1,
        //     cacheGroups: {
        //         vendors: {
        //             test: /[\\/]node_modules[\\/]/,
        //             name: 'vendors',
        //             chunks: 'all'
        //         }
        //     }
        // },
        noEmitOnErrors: true
    },
    module: {
        rules: [{
            test: /\.(js|jsx)?$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
            }]
        }, {
            /**
             * 主项目的css
             */
            test: /\.(css|scss)$/,
            include: path.resolve(__dirname, 'src'),
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        importLoaders: 2,
                        localIdentName: '[local]__[hash:base64:5]',
                        minimize: {
                            safe: true
                        }
                    }
                },
                'postcss-loader',
                'sass-loader'
            ]
        }, {
            /**
             * 第三方组件的css, scss.
             */
            test: /\.css$/,
            include: [path.resolve(__dirname, 'node_modules')],
            use: [MiniCssExtractPlugin.loader, 'css-loader']
        }, {
            /**
             * 字体加载器
             */
            test: /\.(woff|eot|ttf|svg)$/,
            include: path.resolve(__dirname, 'src/fonts'),
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10,
                    name: `${ASSETS_PATH}/fonts/[name]_[hash].[ext]`
                }
            }]
        }, {
            /**
             * 图片加载器
             */
            test: /\.(png|jpg|jpeg|gif|svg)$/,
            exclude: path.resolve(__dirname, 'src/fonts'),
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10,
                    name: `${ASSETS_PATH}/images/[name]_[hash].[ext]`
                }
            }]
        }, {
            test: /\.ico$/,
            include: path.resolve(__dirname, 'src/images'),
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10,
                    name: `${ASSETS_PATH}/images/[name].[ext]`
                }
            }]
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['build']),                  // 清除编译目录
        new MiniCssExtractPlugin({
            filename: `${ASSETS_PATH}/css/[name].[contenthash].css`,
            chunkFilename: `${ASSETS_PATH}/css/[name].[contenthash].css`   // chunk css file
        }),
        new HtmlWebpackPlugin({                             // 主页面入口index.html
            title: project.title,
            faviconPath: ASSETS_PATH,
            filename: ROOT_PATH + 'index.html',
            template: './src/template.html',
        }),
        new CaseSensitivePathsPlugin()                      // 文件大小写检测
    ]
};
    