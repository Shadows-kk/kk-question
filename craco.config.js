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
  },
}
