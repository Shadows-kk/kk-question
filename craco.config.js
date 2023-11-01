/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('node:path')
// eslint-disable-next-line no-undef
module.exports = {
  devServer: {
    port: 8000,
    proxy: {
      '/api': 'http://localhost:4001',
    },
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure(webpackConfig) {
      if (webpackConfig.mode == 'production') {
        // 抽离公共代码，只在生产环境下
        if (webpackConfig.optimization == null) {
          webpackConfig.optimization = {}
        }
        webpackConfig.optimization.splitChunks = {
          chunks: 'all', //所有模块
          cacheGroups: {
            antd: {
              name: 'antd-chunk',
              priority: 100,
              test: /antd/,
            },
            reactDom: {
              name: 'reactDom-chunk',
              priority: 99,
              test: /react-dom/,
            },
            // 其他的第三方模块
            vendors: {
              name: 'vendors-chunk',
              priority: 98,
              test: /node_modules/,
            },
          },
        }
      }
      return webpackConfig
    },
  },
}
