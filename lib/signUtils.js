"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSign = getSign;
exports.validateSign = validateSign;

function _react() {
  const data = _interopRequireDefault(require("react"));

  _react = function _react() {
    return data;
  };

  return data;
}

var _cryptoJSUtils = require("./cryptoJSUtils");

var _validateUtil = require("./validateUtil");

function _md() {
  const data = _interopRequireDefault(require("md5"));

  _md = function _md() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const paramsFilter = params => {
  let result = {};
  Object.keys(params).forEach(key => {
    if (!(0, _validateUtil.isEmpty)(params[key])) {
      result[key] = params[key];
    }
  });
  return result;
};

const createLinkString = params => {
  let keys = Object.keys(params);
  keys = keys.sort((a, b) => a > b ? 1 : -1);
  let linkStrings = [];
  keys.forEach(key => {
    if (key !== 'sign') {
      linkStrings.push(key + '=' + params[key]);
    }
  });
  let linkString = linkStrings.join('&');
  return linkString;
};

function getSign(params) {
  let linkString = createLinkString(paramsFilter(params));
  let md5String = (0, _md().default)(linkString);
  return (0, _cryptoJSUtils.encrypt16)(md5String);
}

function validateSign(params) {
  const sign = params.sign,
        resprops = _objectWithoutProperties(params, ["sign"]);

  const newSign = getSign(resprops);
  return newSign === sign;
}