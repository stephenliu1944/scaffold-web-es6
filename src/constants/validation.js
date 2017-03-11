/**
 * @desc 主要用于form验证, 可以搭配antDesign的validation使用.
 * message需要动态传参时可以改为function, 如REQUIRED中的message一样, 但注意不要影响其他使用到此对象的地方.
 */

// 必填项验证
export const RequiredCheck = {
    message: function(value = ''){
        return `${value}不能为空`;
    },
    pattern: /^\s*$/g
};
// 邮箱格式验证
export const EmallCheck = {
    message: '邮箱格式不正确',
    pattern: /^(([^<>()[\]\\.,;:\s@\']+(\.[^<>()[\]\\.,;:\s@\']+)*)|(\'.+\'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
};
// 电话格式验证, 如座机
export const PhoneCheck = {
    message: '电话格式不正确',
    pattern: /(^(\d{3,4}[-]?)?\d{7,8})$|^((1[0-9][0-9]\d{8}$))/
};
// 手机格式验证
export const CellphoneCheck = {
    message: '手机格式不正确',
    pattern: /^(1[3-8][0-9])\d{8}$/
};
// 日期格式验证
export const DateCheck = {
    message: '日期格式不正确',
    pattern: /^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$/
};
// 身份证格式验证
export const IDcardCheck = {
    message: '身份证格式不正确',
    pattern: /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/
};
// 金额格式验证
export const PriceCheck = {
    message: '金额格式不正确',
    pattern: /^\d+(\.\d{1,2})?$/
};
// 纯数字验证
export const NumericCheck = {
    message: '请输入数字',
    pattern: /^[-+]?[0-9]+$/
};
// 纯字母验证
export const LetterCheck = {
    message: '请输入英文字符',
    pattern: /^[A-Za-z]+$/
};
// 字母加数字验证
export const LetterNumCheck = {
    message: '请输入英文字符或数字',
    pattern: /^[A-Za-z0-9]+$/
};
// 字母加数字加中文验证
export const LetterNumCNCheck = {
    message: '请输入英文字, 或数字或中文',
    pattern: /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[\w])*$/
};
//只能输入正整数
export const  PositiveInteger={
    message: '只能输入整数',
    pattern: /^\d+$/
};
