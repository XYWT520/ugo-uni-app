import Vue from 'vue'
import App from './App'

// 封装完成后,在 main.js 中导入
import 'utils/http.js'
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
