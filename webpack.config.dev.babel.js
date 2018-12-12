import path from 'path';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import { proxy } from '@beancommons/proxy';
import baseConfig from './webpack.config.base';
import pkg from './package.json';

const { local, proxy: proxyOpts } = pkg.devServer;

export default webpackMerge(baseConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        host: '0.0.0.0',
        port: local,
        disableHostCheck: true,
        compress: true,             // 开起 gzip 压缩
        inline: true,
        historyApiFallback: true,   // browserHistory路由
        contentBase: path.resolve(__dirname, 'build'),
        proxy: {
            ...proxy(proxyOpts)
        }
    },
    module: {
        rules: [{
        /**
         * eslint代码规范校验
         */
            test: /\.(js|jsx)$/,
            enforce: 'pre',
            include: path.resolve(__dirname, 'src'),
            use: [{
                loader: 'eslint-loader',
                options: {
                    fix: true,
                    configFile: '.eslintrc.json'
                }
            }]
        }]
    },
    plugins: [
        // 配置全局变量
        new webpack.DefinePlugin({
            __DEV__: true,
            __MOCK__: process.env.NODE_ENV === 'mock'
        })
    ]
});
