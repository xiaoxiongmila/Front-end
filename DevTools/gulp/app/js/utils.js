"use strict";

/**
 * js 动画库
 * @constructor
 */

/**
 * 选择器函数
 * @param selector 函数名 id、class或者元素
 * @param context 上下文背景元素，可缺省，默认是document
 * @returns {Array.<T>} 返回一个数组
 */
function $$(selector, context) {
    context = context || document;
    var elements = context.querySelectorAll(selector);
    return Array.prototype.slice.call(elements);
};
/**
 * 获取元素样式
 * @param obj 要获取样式的对象
 * @param attr 要获取元素的属性
 * @returns {*} 返回元素的属性，带单位
 */
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
    }
    ;
};


/**
 * 字符串数字转数字
 * @param str 要转化的字符串
 * @returns {number} 返回的num结果
 */
function strToNumber(str) {
    return +str;
};

/**
 * 去除首位空格
 * @param str
 * @returns {XML|string|void|*}
 */
function trimSpace(str) {
    var reg = /^\s+|\s+$/g;
    return str.replace(reg, '');
};

/**
 *调用!  addCSSRule(document.styleSheets[0], "header", "float: left");
 * @param sheet
 * @param selector
 * @param rules
 * @param index
 */
function addCSSRule(sheet, selector, rules, index) {
    // 注意 sheet 的新 API
    if (sheet.insertRule) {
        sheet.insertRule(selector + "{" + rules + "}", index);
    } else {
        sheet.addRule(selector, rules, index);
    }
    ;
};

/**
 * 加载样式文件
 * @param url 文件地址
 * @constructor
 */
function LoadStyle(url) {
    try {
        document.createStyleSheet(url)
    } catch (e) {
        var cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.type = 'text/css';
        cssLink.href = url;
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(cssLink)
    }
    ;
};

/**
 * 获取对象的绝对位置
 * @param obj
 * @returns {{left: number, top: number}}
 */
function getPos(obj){
    var pos={left:0,top:0};
    while(obj){
        pos.left+=obj.offsetLeft;
        pos.top+=obj.offsetTop;
        obj=obj.offsetParent
    };
    return pos;
};

//=============验证类====================
/**
 * 是否为数字
 * @param value
 * @returns {boolean}
 */
function isDigit(value) {
    var patrn = /^[0-9]*$/;
    if (patrn.exec(value) == null || value == "") {
        return false
    } else {
        return true
    }
    ;
};

function isMobile() {
    var u = navigator.userAgent;
    return u.match(/(iPhone|iPod|Android|ios)/i);
};

function isAndroid() {
    var u = navigator.userAgent;
    return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
}

function isIOS() {
    var u = navigator.userAgent;
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}
//=============事件操作===================
/**
 * 居中
 *  @param obj 居中对象
 */
function center(obj) {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
    obj.style.position = 'absolute';
    obj.style.left = ( document.documentElement.clientWidth - obj.offsetWidth ) / 2 + scrollLeft + 'px';
    obj.style.top = ( document.documentElement.clientHeight - obj.offsetHeight ) / 2 + scrollTop + 'px';
};

/**
 * 运动函数
 * @param obj
 * @param json
 * @param fn
 */
function startMove(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var bStop = true;		//这一次运动就结束了——所有的值都到达了
        for (var attr in json) {
            //1.取当前的值
            var iCur = 0;
            if (attr == 'opacity') {
                iCur = parseInt(parseFloat(getStyle(obj, attr)) * 100);
            } else {
                iCur = parseInt(getStyle(obj, attr));
            }
            //2.算速度
            var iSpeed = (json[attr] - iCur) / 8;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            //3.检测停止
            if (iCur != json[attr]) {
                bStop = false;
            }
            if (attr == 'opacity') {
                obj.style.filter = 'alpha(opacity:' + (iCur + iSpeed) + ')';
                obj.style.opacity = (iCur + iSpeed) / 100;
            } else {
                obj.style[attr] = iCur + iSpeed + 'px';
            };
        };
        if (bStop) {
            clearInterval(obj.timer);
            fn && fn();
        };
    }, 30)
};
/**
 * 拖拽
 * @param obj 拖拽对象
 */
function drag(obj) {
    obj.onmousedown = function (ev) {
        var ev = ev || event;
        var disX = ev.clientX - this.offsetLeft;
        var disY = ev.clientY - this.offsetTop;
        if (obj.setCapture) {
            obj.setCapture();
        }
        document.onmousemove = function (ev) {
            var ev = ev || event;
            var L = ev.clientX - disX;
            var T = ev.clientY - disY;

            if (L < 0) {
                L = 0;
            } else if (L > document.documentElement.clientWidth - obj.offsetWidth) {
                L = document.documentElement.clientWidth - obj.offsetWidth;
            }
            ;
            if (T < 0) {
                T = 0;
            } else if (T > document.documentElement.clientHeight - obj.offsetHeight) {
                T = document.documentElement.clientHeight - obj.offsetHeight;
            }
            ;
            obj.style.left = L + 'px';
            obj.style.top = T + 'px';
        };
        document.onmouseup = function () {
            document.onmousemove = document.onmouseup = null;
            if (obj.releaseCapture) {
                obj.releaseCapture();
            }
            ;
        };
        return false;
    };
};




