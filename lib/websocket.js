"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _react() {
  const data = _interopRequireDefault(require("react"));

  _react = function _react() {
    return data;
  };

  return data;
}

function _sockjsClient() {
  const data = _interopRequireDefault(require("sockjs-client"));

  _sockjsClient = function _sockjsClient() {
    return data;
  };

  return data;
}

function _stompjs() {
  const data = _interopRequireDefault(require("stompjs"));

  _stompjs = function _stompjs() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * options{
 *   url:'socketUrl'
 *   headers:发送参数
 *   receives ：接收队列
 *   send:'重发队列'
 *   send_params:'重发队列参数'
 *   timeout:'“超时时间秒”'
 *   reConnectNum:'重连次数'
 *   resendNum:'重发次数'
 * }
 */
class StompWebSocket {
  /* websocket实例 */

  /* '#'为私有属性，外部不可调用 */
  // 计时器
  // 参数
  constructor(options) {
    this._socket = null;
    this._stompClient = null;
    this._timer = null;
    this._options = {
      url: '',
      headers: null,
      receives: '',
      send: '',
      sendParams: '',
      timeout: 30,
      reConnectNum: 3,
      resendNum: 3
    };
    this._msg = {
      200: '连接成功',
      '001': '重发次数超出',
      '002': '重连次数超出'
    };
    this._reConnectNum = 0;
    this._resendNum = 0;

    this.send = () => {
      const that = this;
      that.resendNum = 0;
      that.reConnectNum = 0;
      return new Promise((resolve, reject) => {
        return that._connect(resolve, reject);
      }).catch(reject => {
        return reject;
      });
    };

    this._options = _objectSpread(_objectSpread({}, this._options), options);
    const _this$_options = this._options,
          reConnectNum = _this$_options.reConnectNum,
          resendNum = _this$_options.resendNum,
          url = _this$_options.url;
    this._reConnectNum = reConnectNum;
    this._resendNum = resendNum;

    if (url) {
      this._socket = new (_sockjsClient().default)(url);
    }
  }

  _clearTimeout() {
    clearTimeout(this._timer);
  }

  _resend(resolve, reject) {
    const that = this;

    this._clearTimeout();

    const _this$_options2 = this._options,
          send = _this$_options2.send,
          sendParams = _this$_options2.sendParams,
          timeout = _this$_options2.timeout;

    if (this._resendNum <= 0) {
      this.dispose();
      return reject({
        code: '001',
        msg: this._msg['001']
      });
    } else {
      this._resendNum--;
    }

    that._timer = setTimeout(() => {
      try {
        this._stompClient.send(send, {}, sendParams);

        that._resend(resolve, reject);
      } catch (err) {
        console.log(`断线了: ${err}`);

        that._reconnect(resolve, reject, err);
      }
    }, timeout * 1000);
  }

  _reconnect(resolve, reject) {
    if (this._reConnectNum <= 0) {
      reject({
        data: null,
        code: '002',
        msg: this._msg['002']
      });
    } else {
      this._reConnectNum--;

      this._stompClient.disconnect();

      this._stompClient = null;

      this._connect(resolve, reject);
    }
  }

  _connect(resolve, reject) {
    const that = this;
    const _this$_options3 = this._options,
          receives = _this$_options3.receives,
          send = _this$_options3.send,
          headers = _this$_options3.headers;
    this._stompClient = _stompjs().default.over(this._socket);

    this._stompClient.connect(headers, () => {
      console.log('连接成功');

      if (send) {
        that._resend(resolve, reject);
      }

      this._stompClient.subscribe(receives, response => {
        // 接收到服务端信息的回调函数
        resolve({
          data: response.body,
          code: '200'
        });
      });
    }, error => {
      console.log(`断线了: ${error}`);

      that._reconnect(resolve, reject, error);
    });
  }

  dispose() {
    if (this._stompClient) {
      this._stompClient.disconnect();

      this._clearTimeout();

      this._stompClient = null;
      this._socket = null;
    }
  }

}

var _default = StompWebSocket;
exports.default = _default;