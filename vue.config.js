module.exports = {
  devServer: {
    open: true
  },
  css: {
    loaderOptions: {
      sass: {
        // 新版本scss-loader，将data改成prependData
        prependData: `@import "@/assets/scss/_variable.scss";`
      }
    }
  }
}
