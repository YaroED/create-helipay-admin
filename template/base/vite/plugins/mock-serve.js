import { viteMockServe } from 'vite-plugin-mock'

export default function createMockServe(prodMock, command) {
  return viteMockServe({
    mockPath: 'mock',
    localEnabled: command === 'serve',
    prodEnabled: command !== 'serve' && prodMock,
    watchFiles: true,
    injectCode: `
      import { setupProdMockServer } from '../mockProdServer';
      setupProdMockServer();
    `,
    logger: true
  })
}
