// 微信小程序、支付宝小程序、云闪付app以及一般环境配置
export function userAmbientCfg(e) {
  switch (e) {
    case 'wechat':
      return 'wechat'
    case 'aliapp':
      return 'aliapp'
    case 'cloudpay':
      return 'cloudpay'
    default:
      return null
  }
}
