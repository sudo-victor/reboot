const child_process = require('child_process')
const fs = require('fs')

const myPackage = require('../package.json')

const { Ink } = require('../src/utils/Ink')

class Watch {
  childNode = null

  execLog(filename) {
    const paint = Ink.paintYellow

    process.stdout.write(paint(`🚀 Running the ${myPackage.name} - v${myPackage.version}\n`))
    process.stdout.write(paint(`🌚 File changed ${filename}\n`))
    process.stdout.write(paint(`⏱️  ${new Date().toUTCString()}\n\n`))
    return this
  }

  execCleanChild() {
    if(this.childNode) this.childNode.kill();
    return this
  }

  execRunChild(path = "index.js") {
    this.childNode = child_process.spawn(`node`, [path])

    this.childNode.stdout.on("data", data => {
      const paint = Ink.paintGreen
      process.stdout.write(paint(data.toString()))
    })

    this.childNode.stderr.on("data", data => {
      const paint = Ink.paintRed
      process.stderr.write(paint(data.toString()))
    })
    return this
  }

  static listen(options) {
    if (!(options.mainFile && options.observedDir)) {
      throw new Error("You must specify a file to compile and a directory to observe")
    }

    const watcher = new Watch()

    if (!watcher.childNode) {
      watcher
        .execLog("-")
        .execRunChild(options.mainFile)
    }

    fs.watch(options.observedDir, { encoding: 'utf8', recursive: true }, (_, source) => {
      watcher
        .execLog(source)
        .execCleanChild()
        .execRunChild(options.mainFile)
    })
  }
}

module.exports = { Watch }