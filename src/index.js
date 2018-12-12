import 'styles/main.scss';
import 'images/favicon.ico';
import http, { proxyBaseURL } from '@beancommons/http';
import Home from 'containers/home/Home';
import { getIPInfo } from 'services/demo';

/**
 * Demo
 */
// 设置全局 http 默认选项。
http.defaults = {
    // baseURL: Server.getOpenAPIServer(),
    // requestInterceptor,
    // resolveInterceptor,
    proxyPath: proxyBaseURL,
    enableProxy: __DEV__,
    isDev: __DEV__
};

// http 请求
getIPInfo('210.75.225.254');

document.querySelector('#app').innerHTML = new Home().render();