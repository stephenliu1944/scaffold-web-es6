import { TLD, SLD } from '../constants/common';

// 根据Host获取顶级域名
export function getTopDomain() {
    if (__DEV__) {
	   return TLD;
    }

    var hostArray = location.host.split('.');
    hostArray.shift();	// 去掉二级域名
    return hostArray.join('.');
}
export function getRootPath(subDomain = '') {
    if(isNotBlank(subDomain)){
        subDomain = subDomain + '.';
    }
    return `${location.protocol}//${subDomain}${getTopDomain()}`;
}
export function getRootWWW() {
    return getRootPath(SLD.WWW);
}
// 内部函数, 用于判断对象类型
function _getClass(object) {
    return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
}

export function isArray(obj) {
    return _getClass(obj).toLowerCase() === 'array';
}

export function isString(obj) {
    return _getClass(obj).toLowerCase() === 'string';
}

export function isDate(obj) {
    return _getClass(obj).toLowerCase() === 'date';
}

export function isObject(obj) {
    return _getClass(obj).toLowerCase() === 'object';
}

export function isNumber(obj) {
    return _getClass(obj).toLowerCase() === 'number' && !isNaN(obj);
}

export function getCookie(name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(name + '=');
        if (c_start !== -1) {
        	c_start = c_start + name.length + 1;
        	var c_end = document.cookie.indexOf(';', c_start);
        	if (c_end === -1) {
        		c_end = document.cookie.length;
        	}
        	return unescape(document.cookie.substring(c_start, c_end));
        }
    }
}

/**
 * @desc 判断参数是否为空, 包括null, undefined, [], '', {}
 * @param {object} obj 需判断的对象
 */
export function isEmpty(obj) {
    var empty = false;

    if (obj === null) {    // null and undefined
    	empty = true;
    } else if ((isArray(obj) || isString(obj)) && obj.length === 0) {
    	empty = true;
    } else if (isObject(obj)) {
    	var hasProp = false;
    	for (let prop in obj) {
    		if (prop) {
    			hasProp = true;
    			break;
    		}
    	}
    	if (!hasProp) {
    		empty = true;
    	}
    }
    return empty;
}
/**
 * @desc 判断参数是否不为空
 */
export function isNotEmpty(obj) {
    return !isEmpty(obj);
}
/**
 * @desc 判断参数是否为空字符串, 比isEmpty()多判断'   '的情况.
 * @param {string} str 需判断的字符串
 */
export function isBlank(str) {
    if (isEmpty(str)) {
    	return true;
    } else if (isString(str) && str.trim().length === 0) {
    	return true;
    }
    return false;
}
/**
 * @desc 判断参数是否不为空字符串
 */
export function isNotBlank(obj) {
    return !isBlank(obj);
}
/**
 * @desc 随机生成一个uuid号
 */
export function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    	var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    	return v.toString(16);
    });
}

/**
 * @desc 根据对象和传入的对象value属性的值, 查询value对应的name值
 * @param {object} obj 需遍历的对象
 * @param {string} value 需搜索的value属性的值
 * @demo USER = {
 *           A: {
 *               name: '普通会员',
 *               value: 0
 *           },
 *           B: {
 *               name: 'VIP会员',
 *               value: 1
 *           }
 *       }
 */
export function searchNameByVal(obj, value) {
    if (isEmpty(obj) || isEmpty(value)) {
    	return '';
    }

    for (let prop in obj) {
    	if (obj[prop].value === value) {
    		return obj[prop].name;
    	}
    }
}
