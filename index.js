var ProgressBar = require('progress');
var webpack = require('webpack');

module.exports = function ProgressBarPlugin() {
  var bar = new ProgressBar('  build [:bar] :percent', {
    complete: '=',
    incomplete: ' ',
    width: 20,
    total: 100,
    clear: true
  });

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
