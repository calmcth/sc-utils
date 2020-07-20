"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userAmbientCfg = userAmbientCfg;

function _react() {
  const data = _interopRequireDefault(require("react"));

  _react = function _react() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 微信小程序、支付宝小程序、云闪付app以及一般环境配置
function userAmbientCfg(e) {
  switch (e) {
    case 'wechat':
      return 'wechat';

    case 'aliapp':
      return 'aliapp';

    case 'cloudpay':
      return 'cloudpay';

    default:
      return null;
  }
}