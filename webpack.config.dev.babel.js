import path from 'path';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import baseConfig from './webpack.config.base';
import pkg from './package.json';

const { local, mock, api } = pkg.devServer;

export default webpackMerge(baseConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        host: '0.0.0.0',
        port: local.port,
        disableHostCheck: true,
        compress: true,             // 开起 gzip 压缩
        inline: true,
        historyApiFallback: true,   // browserHistory路由
        contentBase: path.resolve(__dirname, 'build'),
        proxy: {
            '/mock': {
                changeOrigin: true,
                target: `${ mock.host }:${ mock.port }`,
                pathRewrite: { '^/mock': '' }
            },
            '/proxy': {   // matches paths starting with '/api'
                changeOrigin: true,
                target: `${ api.host }:${ api.port }`,
                pathRewrite: { '^/proxy': '' }
            }
        },
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
