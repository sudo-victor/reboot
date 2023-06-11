const fs = require('fs');

class WindowsWatcher {
  static listen(options, callback) {
    fs.watchFile("./file.txt", (current, previous) => {
      return console.log(`updated`)
    })
  }
}

module.exports = { WindowsWatcher }