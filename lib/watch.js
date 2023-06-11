const child_process = require('child_process')
const fs = require('fs')
const myPackage = require('./../package.json')

class Watch {
  childNode = null

  execLog(filename) {
    process.stdout.write(`🚀 Running the ${myPackage.name} - v${myPackage.version}\n`)
    process.stdout.write(`🌚 File changed ${filename}\n`)
    process.stdout.write(`⏱️ ${new Date().toUTCString()}\n\n`)
    return this
  }

  execCleanChild() {
    if(this.childNode) this.childNode.kill();
    return this
  }

  execRunChild(path = "index.js") {
    this.childNode = child_process.spawn(`node`, [path])

    this.childNode.stdout.on("data", data => {
      process.stdout.write(data.toString())
    })

    this.childNode.stderr.on("data", data => {
      process.stderr.write(data.toString())
    })
    return this
  }

  static compile(path, mainFile) {
    const watcher = new Watch()

    if (!watcher.childNode) {
      watcher
        .execLog("-")
        .execRunChild(mainFile)
    }

    fs.watch(path, { encoding: 'utf8', recursive: true }, (_, source) => {
      watcher
        .execLog(source)
        .execCleanChild()
        .execRunChild(mainFile)
    })
  }
}

module.exports = { Watch }