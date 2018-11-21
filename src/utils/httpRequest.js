import { HttpMethod, ContentType } from 'constants/common';
import { isEmpty, isNotEmpty } from 'utils/util';
import Settings from 'config/settings';

// 默认配置
const globalConfig = {
    type: HttpMethod.GET, 
    contentType: ContentType.JSON, 
    url: null, 
    timeout: 10000, 
    cache: false,
    data: null
};

const ReadyState = {
    UNSENT: 0,
    OPENED: 1,
    HEADERS_RECEIVED: 2,
    LOADING: 3,
    DONE: 4
};

function HttpRequest(options) {

    var {
        type,
        contentType,
        url, 
        timeout, 
        cache,
        data
    } = Object.assign({}, globalConfig, options);

    if (isEmpty(url)) {
        return Promise.resolve();
    }

    if (!/^\//.test(url)) {
        url = '/' + url;
    }

    if (!cache) {
        url += `?t=${+new Date()}`;
    }

    if (__DEV__) {
        url = '/proxy' + url;
    } else {
        url = Settings.server + url;
    }

    var promise =  new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
       
        xhr.ontimeout = function() {
            reject('timeout');
        };
        
        xhr.onerror = function(e) {
            reject(e);
        };

        xhr.onreadystatechange = function() {
            if (xhr.readyState === ReadyState.DONE) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                    var data = xhr.responseText;
                    if (isNotEmpty(data)) {
                        try {
                            resolve(JSON.parse(data));
                        } catch (error) {
                            resolve(data);
                        }
                    }
                } else {
                    reject(xhr.status);
                }
            }
        };

        xhr.open(type, url, true);
        // 放在open方法调用之前IE11会报错.
        xhr.timeout = timeout;

        if (type === HttpMethod.POST || type === HttpMethod.PUT) {
            xhr.setRequestHeader('Content-Type', contentType);
            data = JSON.stringify(data);
        }
        
        xhr.send(data);
    });

    promise.catch((e) => {
        console.error(e);
    });

    return promise;
}

HttpRequest.setup = function(options) {
    Object.assign(globalConfig, options);
};

export default HttpRequest;