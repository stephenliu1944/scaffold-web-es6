import qs from "qs";
import axios from "axios";
import emitter from './emitter';
import { HttpMethod, MOCK_PATH } from "../constants/common";
import { isString, isArray, isBlank, isEmpty, isNotEmpty } from "./util";
import { API_PATH, Event } from '../constants/common';

/**
 * @desc 使用axios第三方库访问后台服务器, 返回封装过后的Promise对象.
 * @param {string} url 请求的接口地址, 格式: "/xxx..."
 * @param {string} domain 跨域请求的域名地址, 如: www.baidu.com
 * @param {string} type HTTP请求方式, 默认GET.
 * @param {object} data 请求的数据, object对象格式
 * @param {function} onUpload 上传文件过程中的回调函数, 接收progressEvent参数.
 * @param {function} onDownload 下载文件过程中的回调函数, 接收progressEvent参数.
 * @param {function} cancel 取消请求的回调函数, 接收cancel参数, 当执行cancel()参数时请求被取消.
 * @return {object} - 返回一个promise的实例对象
 */
export default function MyPromise({url = null, domain = null, type = HttpMethod.GET, data = null, onUpload = null, onDownload = null, cancel = null}) {
    var getData;
    var postData;
    var cancelToken;
    var crossDomain = false;

    if(isEmpty(url)){
        return Promise.resolve();
    }

    if(type == HttpMethod.POST) {
        if(isNotEmpty(data)){
            postData = qs.stringify(data, {allowDots: true});
        }
    }else{
        getData = data;
    }

    if(isNotEmpty(domain)) {
        crossDomain = true;
    }else if(__MOCK__){
        domain = MOCK_PATH;
    }else if(__DEV__){
        domain = API_PATH;
    }

    if(isNotEmpty(cancel)) {
        var CancelToken = axios.CancelToken;
        cancelToken = new CancelToken(cancel);
    }

    if (__DEV__) {
        info({url, domain, type, data}, "Request");
    }

    showLoading(type, url);

    var promise = new Promise(function(resolve, reject) {

        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        var httpRequest = axios({
            method: type,
            baseURL: domain,
            url: url,
            params: getData,
            data: postData,
            withCredentials: crossDomain,
            onUploadProgress: onUpload,
            onDownloadProgress: onDownload,
            cancelToken: cancelToken
        }).then(function (response) {
            hideLoading(response.config);

            if(isBlank(response.data)){
                message.error('请求数据异常, 请稍后再试.');
                reject(response);
                throw response;
            }else{
                var responseData = response.data;
                if(isString(responseData)){
                    try{
                        responseData = JSON.parse(responseData);
                    }catch(e){
                        try{
                            /* eslint-disable no-eval */
                            responseData = eval('(' + responseData + ')');
                            /* eslint-enable no-eval */
                        }catch(e){
                            console.error(e);
                            return Promise.reject("response数据转换错误");
                        }
                    }
                }

                if (__DEV__) {
                    info(responseData, "Response");
                }
                // 返回成功
                if(responseData.success){
                    // 分页数据
                    if(responseData.count) {
                        resolve({
                            data: responseData.data,
                            count: responseData.count,
                            pageSize: responseData.pageSize,
                            pageNum: responseData.pageNum
                        });
                    // 常规数据
                    }else{
                        resolve(responseData.data);
                    }
                // 返回失败
                }else{
                    reject(responseData);
                    handError(responseData);
                }
            }
        }).catch(function (error) {
            hideLoading(error.config);

            if (error.response) {
                console.error(error.response.data);
                reject(error.response);
                throw error.response.data;
            } else {
                console.error(error.message);
                reject(error.message);
                throw error.message;
            }
            message.error('服务异常, 请稍后再试');
        });
    });

    return promise;
}

function showLoading(method, url) {
    if(method === HttpMethod.POST){
        emitter.emit(Event.SHOW_LOADING);
    }
}

function hideLoading(config) {
    emitter.emit(Event.HIDE_LOADING);
}

function handError(response) {
    var code = response.code || response.resultCode;
    var msg = response.msg || response.resultDesc;

    switch (code) {
        case 'SESSION_EMPTY':
        /**
         * 300~ 数据相关
         */
        case 314:   // 未登录
            location.href = `${getRootPassport()}?callBack=${getRootBG()}`;
            break;
        /**
         * 400~ 权限相关
         */
        case 401:   // 没有权限访问
            // TODO: 页面跳转?
            break;
        case 402:   // 没有开通
            location.href = `${getRootPassport()}/user/index.html`;
            break;
        case 403:   // 没有认证
            location.href = `${getRootReport()}/search/noPermission.html`;
            break;
        case 405:   // 余额不足
            location.href = `${getRootReport()}/search/noAcount.html`;
            break;
        case 407:   // 没有登陆
            location.href = `${getRootReport()}/search/noPermission_1.html`;
            break;
        /**
         * 500~ 服务相关
         */
        default:    // 未知错误
            message.error(msg);
    }
}

function info(data, title) {
    /* eslint-disable no-console */
    if (title) {
        console.log(title + " start");
    }
    console.log(data);
    if (console.table && isArray(data.data)) {
        console.table(data.data);
    }
    if (title) {
        console.log(title + " end");
    }
    /* eslint-enable no-console */
}

Promise.prototype.done = function (onFulfilled, onRejected) {
    this.then(onFulfilled, onRejected)
        .catch(function (reason) {
            // 抛出一个全局错误
            setTimeout(() => { throw reason }, 0);
        });
};

Promise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(
        value  => P.resolve(callback(value)).then(() => value),
        reason => P.resolve(callback(reason)).then(() => { throw reason })
    );
};