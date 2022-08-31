var APPLICATION_PORT = process.env.APPLICATION_PORT
var APPLICATION_HOST = process.env.APPLICATION_HOST
var HTTPS_ENABLE = process.env.HTTPS_ENABLE

module.exports = {
  transpileDependencies: true
  // devServer: {
  //   port: APPLICATION_PORT,
  //   host: APPLICATION_HOST,
  //   https: function(httpsEnable) {if (httpsEnable == "1"){return true}else{return false}}(),
  //   hotOnly: false,
  // }
}
