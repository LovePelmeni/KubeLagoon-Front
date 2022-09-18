var APPLICATION_PORT = process.env.APPLICATION_PORT
var APPLICATION_HOST = process.env.APPLICATION_HOST
var HTTPS_ENABLE = process.env.HTTPS_ENABLE

module.exports = {

  devServer: {
    proxy: "https://github.com",
    port: APPLICATION_PORT,
    host: APPLICATION_HOST,
    https: function(httpsEnable) {if (httpsEnable == "1"){return true}else{return false}}(),
  },
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  },
  resolve: {
    fallback: {
      "url": require.resolve("url/")
    }
  }
}
