import { HttpMethod } from "../constants/common";
import { getRootPassport } from "../utils/util";
import MyPromise from "../utils/myPromise";

// 默认Get请求, 不需要添加type属性
export function loadContacts() {
	return MyPromise({
		url: "/common/xxx"
	});
}
// POST请求
export function sendReport(data) {
	return MyPromise({
		url: "/common/xxx",
		type: HttpMethod.POST,
		data: data
	});
}
// 跨域请求需添加domain域名
export function feedback(data){
	return MyPromise({
		domain: 'http://www.xxx.com', 	
		url: "/feedback/save.htm",
		type: HttpMethod.POST,
		data: data
	});
}