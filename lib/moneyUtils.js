"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertMoney = convertMoney;
exports.transformMoney = transformMoney;
exports.formatMoney = formatMoney;
exports.digitUppercase = digitUppercase;
exports.toChinesNum = toChinesNum;

function _react() {
  const data = _interopRequireDefault(require("react"));

  _react = function _react() {
    return data;
  };

  return data;
}

var _validateUtil = require("./validateUtil");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 格式化金额
function convertMoney(s) {
  if ((0, _validateUtil.isEmpty)(s)) {
    return formatMoney(s);
  } else {
    if (s % 100 === 0) {
      return formatMoney(s / 100);
    } else {
      return formatMoney(s / 100 + '.' + s % 100);
    }
  }
} // 金额单位分转换为元


function transformMoney(num, count) {
  let money = 0.00,
      integer = [],
      digits = /^\d+$/.test(count) ? count : 2;

  if (num) {
    money = (num * 0.01).toFixed(digits); //分到元，保留两位小数

    if (digits) {
      integer = money.toString().split('.');

      if (integer.length === 1) {
        money = money.toString() + '.00';
        return money;
      }

      if (integer.length > 1) {
        if (integer[1].length < 2) {
          money = money.toString() + '0';
        }

        return money;
      }
    } else {
      return money;
    }
  } else if (num == 0) {
    return 0 .toFixed(digits);
  } else {
    return '-';
  }
}
/**
 * 格式化金额
 * @param s xxxxxx.xx
 * @returns {String} ￥xxx,xxx.xx
 */


function formatMoney(s) {
  if (s === null || s === undefined || s === 'null') {
    return '';
  }

  var n = 2;
  s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + '';
  var l = s.split('.')[0].split('').reverse(),
      r = s.split('.')[1];
  var t = '';

  for (var i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && i + 1 !== l.length ? ',' : '');
  }

  return t.split('').reverse().join('') + '.' + r;
}

;
/**
 * 转大写金额
 * @param n
 * @returns {string}
 */

function digitUppercase(n) {
  const fraction = ['角', '分'];
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
  let num = Math.abs(n);
  let s = '';
  fraction.forEach((item, index) => {
    s += (digit[Math.floor(num * 10 * Math.pow(10, index)) % 10] + item).replace(/零./, '');
  });
  s = s || '整';
  num = Math.floor(num);

  for (let i = 0; i < unit[0].length && num > 0; i += 1) {
    let p = '';

    for (let j = 0; j < unit[1].length && num > 0; j += 1) {
      p = digit[num % 10] + unit[1][j] + p;
      num = Math.floor(num / 10);
    }

    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }

  return s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
}
/**
 * 转阿拉伯大写
 * @param n
 * @returns {string}
 */


function toChinesNum(num) {
  let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']; //changeNum[0] = "零"

  let unit = ['', '十', '百', '千', '万'];
  num = parseInt(num);

  let getWan = temp => {
    let strArr = temp.toString().split('').reverse();
    let newNum = '';

    for (var i = 0; i < strArr.length; i++) {
      newNum = (i == 0 && strArr[i] == 0 ? '' : i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? '' : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i])) + newNum;
    }

    return newNum;
  };

  let overWan = Math.floor(num / 10000);
  let noWan = num % 10000;
  if (noWan.toString().length < 4) noWan = '0' + noWan;
  return overWan ? getWan(overWan) + '万' + getWan(noWan) : getWan(num);
}