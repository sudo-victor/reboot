const child_process = require('child_process')

const myPackage = require('../../package.json')
const { Watcher } = require('../platforms/index')
const { Ink } = require('../utils/Ink')


class Reboot {
  childNode = null

  #execLog(options) {
    const paint = Ink.paintYellow

    process.stdout.write(paint(`🚀 Running the ${myPackage.name} - v${myPackage.version}\n`))
    process.stdout.write(paint(`🌚 ${options.event} ${options.source}\n`))
    process.stdout.write(paint(`⏱️  ${new Date().toUTCString()}\n\n`))
    return this
  }

  #execCleanChild() {
    if(this.childNode) this.childNode.kill();
    return this
  }

  #execRunChild(options) {
    const currentPath = options?.mainFile ?? "index.js"

    this.childNode = child_process.spawn(`node`, [currentPath])

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

  initialize(options) {
    return this
      .#execLog({ event: "start", source: "app" })
      .#execRunChild(options)
  }

  reload(options) {
    this
      .#execLog(options)
      .#execCleanChild()
      .#execRunChild(options)
  }

  static listen(options) {
    if (!(options.mainFile && options.observedDir)) {
      throw new Error("You must specify a file to compile and a directory to observe")
    }

    const reboot = new Reboot()

    if (!reboot.childNode) {
      reboot.initialize(options)
    }

    Watcher.listen(options, (eventType, source) => {
      reboot.reload({ ...options, eventType, source })
    });
  }
}

module.exports = { Reboot }