import { createApp } from 'vue'
// import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/display.css' // 引入基于断点的隐藏类
import 'element-plus/dist/index.css'
import 'vant/lib/index.css' // 引入vant css
import '@vant/touch-emulator'
import 'normalize.css' // css初始化
import './assets/style/common.scss' // 公共css
import './theme/modules/chinese/index.scss'
import App from './App.vue'
import store from './store'
import router from './router'
import i18n from './locale'
import elementIcons from '@/components/SvgIcon/svgicon'
import directive from '@helipay/directives'
import modal from '@/utils/modal'
// 自动识别访客sdk
// import { getZhichiScript } from '@/utils/spider'

if (import.meta.env.VITE_APP_ENV === 'production') {
  console.log = function () {}
}
// 360浏览器兼容性
if (typeof window.global === 'undefined') {
  window.global = window
}

/** 权限路由处理主方法 */
const app = createApp(App)
app.use(elementIcons)
// app.use(ElementPlus, { size: store.state.app.elementSize })
app.use(store)
app.use(router)
app.use(i18n)

// 全局方法挂载
app.config.globalProperties.$modal = modal

directive(app)

// app.config.performance = true
app.mount('#app')

// getZhichiScript(window, document, "zc")