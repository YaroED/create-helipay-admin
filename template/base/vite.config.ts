import { loadEnv, ConfigEnv, UserConfigExport } from 'vite'
import { resolve } from 'path'
import createVitePlugins from './vite/plugins'

/**
 * @description-en vite document address
 * @description-cn vite官网
 * https://vitejs.cn/config/ */
export default ({ mode, command }: ConfigEnv): UserConfigExport => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_ENV } = env
  return {
    base: '/online-customer/',
    resolve: {
      alias: {
        '@': resolve(__dirname, '.', 'src'),
        // 解决报tree-shake警告问题
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
      }
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      open: true,
      proxy: {
        // 代理配置
        '/dev-api': {
          // QA环境对外的域名
          target: 'http://xxx.com',
          changeOrigin: true,
          rewrite: p => p.replace(/^\/dev-api/, '/customer-api/')
        }
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            echarts: ['echarts']
          }
        }
      }
    },
    plugins: createVitePlugins(VITE_APP_ENV, command),
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: atRule => {
                if (atRule.name === 'charset') {
                  atRule.remove()
                }
              }
            }
          }
        ]
      }
    }
  }
}
