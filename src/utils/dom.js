/**
 * @desc 判断元素对象是否还在滚动条可见区域
 * @param {string} index 子元素的索引
 * @param {string} scrollTop 滚动条顶部滚动的距离
 * @param {string} parentHeight 父元素的高度
 * @param {string} childHeight 子元素的高度
 */
export function isVisibleChild(index, scrollTop, parentHeight, childHeight) {
    var offsetTop = index * childHeight; // 列表项与父元素顶部的距离
    var offsetHeight = childHeight;      // 列表项的高度
    var visible = true;
    var calculateTop = offsetTop + offsetHeight - scrollTop;    // 计算是否在滚动条可见区域上方
    var calculateBottom = offsetTop - parentHeight - scrollTop; // 计算是否在滚动条可见区域下方

    // 当前对象是显示状态, 并且已经移动到滚动条上方或下方不可见区域
    if (calculateTop <= 0 || calculateBottom >= 0) {
        visible = false;
    }
    return visible;
}

/**
 * @desc 事件代理函数
 * @param {Element} elem 绑定事件的代理元素
 * @param {String} type 触发的事件
 * @param {String} selector 元素选择器, 触发事件的元素
 * @param {Function} fn 事件回调方法.
 * @param {Object} data 传递的参数.
 */
export function delegate(elem, type, selector, fn, data = {}) {
    if (!elem || !type) {
        return;
    }

    function handler(event) {
        var target = event.target;
        var _target = [].find.call(elem.querySelectorAll(selector), (el) => {
            // 确保是在 selector 内的事件源触发
            return el === target || el.contains(target);
        });

        if (_target) {
            // 创建一个事件代理对象.
            var eventProxy = {
                target: event.target,
                currentTarget: _target,
                originalEvent: event,
                relatedTarget: event.relatedTarget,
                type: event.type,
                data,
                preventDefault() {
                    this.originalEvent.preventDefault();
                },
                stopPropagation() {
                    this.originalEvent.stopPropagation();
                },
                stopImmediatePropagation() {
                    this.originalEvent.stopImmediatePropagation();
                    this.stopPropagation();
                }
            };

            var ret = fn.call(_target, eventProxy);
            // 如果方法返回 false 表示阻止浏览器默认行为和事件冒泡, like jQuery.
            if (ret !== undefined) {
                if (ret === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
        }
    }

    if (elem.addEventListener) {
        elem.addEventListener(type, handler);
    }
}