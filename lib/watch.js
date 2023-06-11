const child_process = require('child_process')
const fs = require('fs')
const myPackage = require('./../package.json')

class WatchBuilder {
  #spawn = null

  #log(filename) {
    process.stdout.write(`🚀 Running the ${myPackage.name} - v${myPackage.version}\n`)
    process.stdout.write(`🌚 File changed ${filename}\n`)
    process.stdout.write(`⏱️ ${new Date().toUTCString()}\n\n`)
  }

  #reloadAppSpawn(path = "index.js") {
    if(this.#spawn) this.#spawn.kill();

    this.#spawn = child_process.spawn(`node`, [path])

    this.#spawn.stdout.on("data", data => {
      process.stdout.write(data.toString())
    })

    this.#spawn.stderr.on("data", data => {
      process.stderr.write(data.toString())
    })
  }

  build(path) {
    fs.watch(path, { encoding: 'utf8', recursive: true }, (eventType, source) => {
      this.#log(source)
      this.#reloadAppSpawn(path)
    })
  }
}

module.exports = { WatchBuilder }