var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/app.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  // resolve TypeScript and Vue file
  resolve: {
    extensions: ['','ts', '.vue', '.js'],
    alias: {
      'vue$': 'vue/dist/vue.common.js' // 'vue/dist/vue.common.js' for webpack 1
    }
  },

  module: {
     loaders: [
          { test: /\.vue$/, loader: 'vue' },
          { test: /\.ts$/, loader: 'vue-ts' },
          { test: /\.less$/, loader: "vue-style-loader!css-loader!less-loader" },
          { test: /(jpg|png)$/, loader: "file-loader?name=[name].[ext]?[hash]" },

          { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
          { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" }, 
          { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
          { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
          { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
      ],
  },
  vue: {
    // instruct vue-loader to load TypeScript
    loaders: { 
      js: 'vue-ts-loader', 
      less: 'css!less',
      ts: 'vue-ts-loader'
    },
    // make TS' generated code cooperate with vue-loader
    esModule: true
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  performance: {
    hints: false
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#cheap-eval-source-map',
}


if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
  ])
}
