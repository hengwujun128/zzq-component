//  @vue/cli-service 自动加载该文件
module.exports = {
  // 部署应用包时的基本 URL。用法和 webpack 本身的 output.publicPath 一致，但是 Vue CLI 在一些其他地方也需要用到这个值，所以请始终使用 baseUrl 而不要直接修改 webpack 的 output.publicPath。
  baseUrl:
    process.env.NODE_ENV === "production" ? "/production-sub-path/" : "/",

  // 你可以通过 chainWebpack 调整内联文件的大小限制。例如，下列代码会将其限制设置为 10kb：
  chainWebpack: config => {
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap(options => Object.assign(options, { limit: 10240 }))
    // custome
    // {
    //   loader: 'file-loader',
    //   options: {},
    // }
    // .rule("js")
    // .use("file-loader")
    // .loader("file-loader")
    // .tap(options => {
    //   return Object.assign(options, { publicPath: "www.google.com" })
    // })
  }
}
