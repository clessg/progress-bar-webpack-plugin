var ProgressBar = require('progress');
var chalk = require('chalk');
var _ = require('lodash');
var webpack = require('webpack');

require('object.assign').shim();

module.exports = function ProgressBarPlugin(options) {
  options = options || {};

  var stream = options.stream || process.stderr;
  var isInteractive = stream && stream.isTTY;

  var barLeft = chalk.bold('[');
  var barRight = chalk.bold(']');
  var preamble = chalk.cyan.bold('  build ') + barLeft;
  var barFormat = options.format || preamble + ':bar' + barRight + chalk.green.bold(' :percent');
  var summary = options.summary !== false;

  delete options.format;
  delete options.total;
  delete options.stream;
  delete options.summary;

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
  var lastPercent = 0;

  return new webpack.ProgressPlugin(function (percent) {
    if (!isRunning) {
      if (lastPercent !== 0) {
        stream.write('\n');
      }

      if (!isInteractive) {
        stream.write(preamble);
      }
    }

    var newPercent = Math.ceil(percent * barOptions.width);

    if (lastPercent !== newPercent) {
      if (isInteractive) {
        bar.update(percent);
        lastPercent = newPercent;
      } else {
        stream.write(_.repeat('=', newPercent - lastPercent));

        if (lastPercent < newPercent) {
          lastPercent = newPercent;
        }
      }
    }

    if (!isRunning) {
      isRunning = true;
      startTime = new Date;
      lastPercent = 0;
    } else if (percent === 1) {
      var now = new Date;

      if (isInteractive) {
        bar.terminate();
      } else {
        stream.write(barRight + '\n');
      }

      if (summary) {
        stream.write(chalk.green.bold('Build completed in ' + (now - startTime) / 1000 + 's') + '\n\n');
      }

      isRunning = false;
    }
  });
};
