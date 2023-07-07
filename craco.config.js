// const path = require('path')
// eslint-disable-next-line no-undef
module.exports = {
  devServer: {
    proxy: {
      '/api': 'http://localhost:4001',
    },
  },
  // webpack: {
  //   alias: {
  //     '@': path.resolve(__dirname, 'src'),
  //   },
  // },
}
