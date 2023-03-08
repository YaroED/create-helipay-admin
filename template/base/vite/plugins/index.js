import vue from '@vitejs/plugin-vue'
import createAutoImport from './auto-import'
import createMockServe from './mock-serve'

export default function createVitePlugins(viteEnv, command) {
  // 开发环境才启用Mock
  const isMock = viteEnv === 'development'
  const vitePlugins = [vue()]
  vitePlugins.push(createAutoImport())
  vitePlugins.push(createMockServe(isMock, command))
  return vitePlugins
}
