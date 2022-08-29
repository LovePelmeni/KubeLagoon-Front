var APPLICATION_PORT = process.env.APPLICATION_PORT
var APPLICATION_HOST = process.env.APPLICATION_HOST

module.exports = {
  transpileDependencies: true
  dev: {
    port: APPLICATION_PORT,
    host: APPLICATION_HOST,
    https: function(httpsEnable) -> bool {if (httpsEnable == "1"){return true}else{return false}}(),
    hotOnly: false,
  }
}
