import http, { prepare } from 'axios-enhanced';
import { HttpMethod } from 'constants/common';
/**
 * Demo
 */
// 通过 url 传参
export function getIPInfo(ip) {
    return http({
        url: `/json/${ip}`
    });
}
// 通过 url params 传参
export function getIPInfoByFields(fields) {
    return http({
        url: '/json/24.48.0.1',
        params: {
            fields
        }
    });
}
// 通过 post data 传参
export function addUser(user) {
    return http({
        url: '/user',
        method: HttpMethod.POST,
        data: {
            user
        }
    });
}
// 返回一个预请求对象
export function uploadURL(user) {
    return prepare({
        url: '/upload',
        params: {
            user
        }
    });
}

