var express = require('express');
var app = express();
var webpack = require('webpack');
var path = require('path');
var opn = require('opn')

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development'
}

var compiler = webpack(require('./webpack.config.js'));


app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: '/dist/'
}));

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

app.use('*', function (req, res, next) {
  var filename = path.join(compiler.outputPath,'index.html');
  compiler.outputFileSystem.readFile(filename, function(err, result){
    if (err) {
      return next(err);
    }
    res.set('content-type','text/html');
    res.send(result);
    res.end();
  });
});

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

module.exports = app.listen(6969, function (err) {
  if (err) {
    console.log(err)
    return
  }

  // when env is testing, don't need open it
  if ( process.env.NODE_ENV !== 'testing') {
    opn('0.0.0.0:6969')
  }
})