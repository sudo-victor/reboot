const { UnixWatcher } = require('./unix/UnixWatcher');
const { WindowsWatcher } = require('./windows/WindowsWatcher');

function chooseWatcher() {
  switch(process.arch) {
    case 'x32':
    case 'x64':
      return WindowsWatcher
    case 'arm':
    case 'arm64':
    case 'mips':
    case 'ia32':
    case 'ppc':
    case 'ppc64':
    default:
       return UnixWatcher
  }
}


module.exports = { Watcher: chooseWatcher() }
