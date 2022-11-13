var HTTPS_ENABLE = process.env.HTTPS_ENABLE
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
  configureWebpack: {
    // Configuring the Fallback resolving for the node packages 
    plugins: [
      new NodePolyfillPlugin()
    ],
    resolve: {
      fallback: { 
        crypto: require.resolve('crypto-browserify'),
        https: require.resolve("https-browserify"),
      }
    },
    module: {
        rules: [
            // { test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg|css)$/, loader: 'url-loader', options: {limits: 100000, name: "/assets/[name].[ext]"}},
            { test: /\.node$/, loader: "node-loader"},
            { test: /\.ya?ml$/, loader: 'yaml-loader'},
        ],
     },
  },
  devServer: {
    proxy: "https://github.com",
    https: function(httpsEnable) {if (httpsEnable == "1"){return true}else{return false}}(HTTPS_ENABLE),
  },
  transpileDependencies: true,
  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
      }
    }
}
