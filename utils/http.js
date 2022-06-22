import { $http } from '@escook/request-miniprogram'
// 配置请求根路径
$http.baseUrl = "https://api-ugo-web.itheima.net"

// 将 http 挂载到全局的对象上
uni.$http = $http