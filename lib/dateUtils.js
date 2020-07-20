"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatDate = formatDate;
exports.dateFormat = dateFormat;
exports.formatSeconds = formatSeconds;
exports.interval = interval;

function _react() {
  const data = _interopRequireDefault(require("react"));

  _react = function _react() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 格式化时间
 * @param date yyyymmddHHMMSS
 * @returns mm月dd日 HH:MM
 */
function formatDate(date, format, type) {
  if (date === null || date === undefined || date === 'null') {
    return '';
  }

  switch (format) {
    // 年月
    case 'yyyymm':
      return date.substring(0, 4) + (type || '年') + date.substring(4, 6) + (type ? '' : '月');
      break;
    // 年月日

    case 'yyyymmdd':
      return date.substring(0, 4) + (type || '年') + date.substring(4, 6) + (type || '月') + date.substring(6, 8) + (type ? ' ' : '日');
      break;
    // 年月日时分

    case 'yyyymmddHHMM':
      return date.substring(0, 4) + (type || '年') + date.substring(4, 6) + (type || '月') + date.substring(6, 8) + (type ? ' ' : '日') + date.substring(8, 10) + ':' + date.substring(10, 12);
      break;
    // 年月日时分秒

    case 'yyyymmddHHMMSS':
      return date.substring(0, 4) + (type || '年') + date.substring(4, 6) + (type || '月') + date.substring(6, 8) + (type ? ' ' : '日') + date.substring(8, 10) + ':' + date.substring(10, 12) + ':' + date.substring(12, 14);
      break;
    // 月日时分秒

    case 'mmddHHMMSS':
      return date.substring(4, 6) + (type || '月') + date.substring(6, 8) + (type ? ' ' : '日') + date.substring(8, 10) + ':' + date.substring(10, 12) + ':' + date.substring(12, 14);
      break;
    // 月日时分

    default:
      return date.substring(4, 6) + (type || '月') + date.substring(6, 8) + (type ? ' ' : '日') + date.substring(8, 10) + ':' + date.substring(10, 12);
  }
}

function dateFormat(timestamp, formats) {
  formats = formats || 'yyyy-mm-dd';

  var zero = function zero(value) {
    if (value < 10) {
      return '0' + value;
    }

    return value;
  };

  var myDate = timestamp ? new Date(timestamp) : new Date();
  var year = myDate.getFullYear();
  var month = zero(myDate.getMonth() + 1);
  var day = zero(myDate.getDate());
  var hour = zero(myDate.getHours());
  var minite = zero(myDate.getMinutes());
  var second = zero(myDate.getSeconds());
  return formats.replace(/yyyy|mm|dd|HH|MM|SS/gi, function (matches) {
    return {
      yyyy: year,
      mm: month,
      dd: day,
      HH: hour,
      MM: minite,
      SS: second
    }[matches];
  });
}

function formatSeconds(value) {
  var secondTime = parseInt(value); // 秒

  var minuteTime = 0; // 分

  var hourTime = 0; // 小时

  if (secondTime > 60) {
    //如果秒数大于60，将秒数转换成整数
    //获取分钟，除以60取整数，得到整数分钟
    minuteTime = parseInt(secondTime / 60); //获取秒数，秒数取佘，得到整数秒数

    secondTime = parseInt(secondTime % 60); //如果分钟大于60，将分钟转换成小时

    if (minuteTime > 60) {
      //获取小时，获取分钟除以60，得到整数小时
      hourTime = parseInt(minuteTime / 60); //获取小时后取佘的分，获取分钟除以60取佘的分

      minuteTime = parseInt(minuteTime % 60);
    }
  }

  var result = {
    h: hourTime <= 9 ? '0' + hourTime : '' + hourTime,
    m: minuteTime <= 9 ? '0' + minuteTime : '' + minuteTime,
    s: secondTime <= 9 ? '0' + secondTime : '' + secondTime
  };
  return result;
}

function interval(date) {
  var date1 = new Date(dateFormat(new Date(), 'yyyy/mm/dd HH:MM:SS'));
  var date2 = new Date(formatDate(date, 'yyyymmddHHMMSS', '/'));
  var s1 = date1.getTime(),
      s2 = date2.getTime();
  var total = (s2 - s1) / 1000;
  var day = parseInt(total / (24 * 60 * 60)); //计算整数天数

  var afterDay = total - day * 24 * 60 * 60; //取得算出天数后剩余的秒数

  var hour = parseInt(afterDay / (60 * 60)); //计算整数小时数

  var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60; //取得算出小时数后剩余的秒数

  var min = parseInt(afterHour / 60); //计算整数分

  var afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60; //取得算出分后剩余的秒数

  let result = {
    h: hour <= 9 ? '0' + hour : hour,
    m: min <= 9 ? '0' + min : min,
    s: afterMin <= 9 ? '0' + afterMin : afterMin
  };

  if (hour >= 2 && (min > 0 || afterMin > 0)) {
    result = {
      h: '02',
      m: '00',
      s: '00'
    };
  }

  return result;
}