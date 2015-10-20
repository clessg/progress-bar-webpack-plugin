# progress-bar-webpack-plugin
![progress-bar-webpack-plugin](http://i.imgur.com/wGvdIcr.gif)

## Installation

```
npm i -D progress-bar-webpack-plugin
```

## Usage

Include the following in your Webpack config.

```javascript
var ProgressBarPlugin = require('progress-bar-webpack-plugin');

...

plugins: [
  new ProgressBarPlugin()
]
```

## Options

Accepts almost all of the same options as [node-progress](https://github.com/tj/node-progress#options).

- `format` the format of the progress bar
- `width` the displayed width of the progress bar defaulting to total
- `complete` completion character defaulting to "="
- `incomplete` incomplete character defaulting to "-"
- `renderThrottle` minimum time between updates in milliseconds defaulting to 16
- `clear` option to clear the bar on completion defaulting to false
- `callback` optional function to call when the progress bar completes

The `format` option accepts the following tokens:

- `:bar` the progress bar itself
- `:current` current tick number
- `:total` total ticks
- `:elapsed` time elapsed in seconds
- `:percent` completion percentage

The default format uses the `:bar` and `:percent` tokens.

To include the time elapsed and prevent the progress bar from being cleared on build completion:

```javascript
new ProgressBarPlugin({
  format: '  build [:bar] :percent (:elapsed seconds)',
  clear: false
})
```

## License

MIT
