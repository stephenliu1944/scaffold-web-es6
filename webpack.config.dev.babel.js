import path from 'path';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import { define } from '@beancommons/define';
import { settings } from 'http-proxy-config';
import BundleAnalyzerPlugin from 'webpack-bundle-analyzer';
import baseConfig from './webpack.config.base';

import pkg from './package.json';

const { servers, proxies, globals } = pkg.devEnvironments;

export default webpackMerge(baseConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        host: '0.0.0.0',
        port: servers.local,
        disableHostCheck: true,
        compress: true,             // 开起 gzip 压缩
        inline: true,
        historyApiFallback: true,   // browserHistory路由
        contentBase: path.resolve(__dirname, 'build'),
        proxy: {
            ...settings(proxies)
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
        // 检查打包内容
        // new BundleAnalyzerPlugin(),
        // 配置全局变量
        new webpack.DefinePlugin({
            __DEV__: true,
            'process.env.NODE_ENV': JSON.stringify('development'),
            ...define(globals)
        })
    ]
});
