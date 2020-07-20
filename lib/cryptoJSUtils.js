"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encrypt = encrypt;
exports.decrypt = decrypt;
exports.encrypt16 = encrypt16;
exports.decrypt16 = decrypt16;

function _react() {
  const data = _interopRequireDefault(require("react"));

  _react = function _react() {
    return data;
  };

  return data;
}

function _cryptoJs() {
  const data = _interopRequireDefault(require("crypto-js"));

  _cryptoJs = function _cryptoJs() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const _key = 'B2E35AD513B9455E';

function encrypt(word) {
  var key = _cryptoJs().default.enc.Utf8.parse(_key);

  var srcs = _cryptoJs().default.enc.Utf8.parse(word);

  var encrypted = _cryptoJs().default.AES.encrypt(srcs, key, {
    mode: _cryptoJs().default.mode.ECB,
    padding: _cryptoJs().default.pad.Pkcs7
  });

  return encrypted;
}

function decrypt(word) {
  var key = _cryptoJs().default.enc.Utf8.parse(_key);

  var decrypt = _cryptoJs().default.AES.decrypt(word, key, {
    mode: _cryptoJs().default.mode.ECB,
    padding: _cryptoJs().default.pad.Pkcs7
  });

  return _cryptoJs().default.enc.Utf8.stringify(decrypt).toString();
}

function encrypt16(word) {
  var encrypted = encrypt(word);
  return encrypted.ciphertext.toString().toUpperCase();
}

function decrypt16(hexStr) {
  var oldHexStr = _cryptoJs().default.enc.Hex.parse(hexStr);

  var base64Str = _cryptoJs().default.enc.Base64.stringify(oldHexStr);

  console.log(base64Str);
  return decrypt(base64Str);
}