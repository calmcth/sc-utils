"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkUserAmbient = checkUserAmbient;
exports.createRequestForm = createRequestForm;

function _react() {
  const data = _interopRequireDefault(require("react"));

  _react = function _react() {
    return data;
  };

  return data;
}

var _config = require("./config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 使用环境：用于区分微信小程序、支付宝小程序、云闪付app以及一般环境
function checkUserAmbient() {
  const ambient = window.navigator.userAgent.toLowerCase();

  if (ambient.indexOf('micromessenger') != -1) {
    return (0, _config.userAmbientCfg)('wechat');
  } else if (ambient.indexOf('alipay') != -1) {
    return (0, _config.userAmbientCfg)('aliapp');
  } else if (ambient.indexOf('cloudpay') != -1) {
    return (0, _config.userAmbientCfg)('cloudpay');
  } else {
    return undefined;
  }
}

function createRequestForm(data) {
  //创建form表单
  var temp_form = document.createElement('form');
  temp_form.action = data.url; //如需打开新窗口，form的target属性要设置为'_blank'

  temp_form.target = '_self';
  temp_form.method = data.method || 'post';
  temp_form.style.display = 'none'; //添加参数

  var PARAMTERS = data.params;

  for (var item in PARAMTERS) {
    var opt = document.createElement('textarea');
    opt.name = item;
    opt.value = PARAMTERS[item];
    temp_form.appendChild(opt);
  }

  document.body.appendChild(temp_form); //提交数据

  temp_form.submit();
}