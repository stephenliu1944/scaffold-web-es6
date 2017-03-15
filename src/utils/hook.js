import { CURRENT_USER } from '../constants/common';
import { getSession } from '../utils/storage';
import { isEmpty, getCookie } from '../utils/util';

/**
 * onEnter
 **/

// 登陆校验
export function checkLogin(nextState, replace, next) {
    if(__DEV__) {
        next();
        return;
    }

/*    var user = getCookie(SSO_SESSION_ID);
    if(isEmpty(user)){
        location.href = `${getRootPassport()}?callBack=${getRootBG()}${nextState.location.pathname}`;
    }*/
    next();
}

/**
 * onLeave
 **/

// 离开页面时校验
export function leaveConfirm(nextLocation) {
    // TODO: 动态传入字符串
    var message = '确认要离开吗？';
    if (!this.state.isSaved){
        return message;
    }
    // 返回 false 会继续停留当前页面，
}
