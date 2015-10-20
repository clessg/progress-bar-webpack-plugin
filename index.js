var ProgressBar = require('progress');
var ansi = require('ansi-styles');
var webpack = require('webpack');

require('object.assign').shim();

module.exports = function ProgressBarPlugin(options) {
  options = options || {};

  var barFormat = options.format || '  build [:bar] :percent';

  delete options.format;
  delete options.total;
  delete options.stream;

  var barOptions = Object.assign({
    complete: '=',
    incomplete: ' ',
    width: 20,
    total: 100,
    clear: true
  }, options);

  var bar = new ProgressBar(barFormat, barOptions);

  var isRunning = false;
  var startTime = 0;

  return new webpack.ProgressPlugin(function (percent) {
    bar.update(percent);

    if (!isRunning) {
      isRunning = true;
      startTime = new Date;
    } else if (percent === 1) {
      var now = new Date;

      console.log(
        '\n' +
        ansi.bold.open + ansi.green.open +
        'Build completed in',
        (now - startTime) / 1000 + 's',
        ansi.green.close + ansi.bold.close,
        '\n'
      );

      bar.terminate();
      isRunning = false;
    }
  });
};
