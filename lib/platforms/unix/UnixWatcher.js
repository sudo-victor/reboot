const fs = require('fs');

class UnixWatcher {
  static listen(options, callback) {
    fs.watch(options.observedDir, { encoding: 'utf8', recursive: true }, callback)
  }
}

module.exports = { UnixWatcher }