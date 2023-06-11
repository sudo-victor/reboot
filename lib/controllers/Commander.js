const path = require("path")

class Commander {
  #args = []

  constructor(args) {
    this.#args = args;
  }

  getMainDir() {
    const cwd = path.resolve(this.getMainFile())
    return path.dirname(cwd)
  }

  getMainFile() {
    if(this.#args.length === 0) {
      throw new Error("Arguments not specified")
    }

    return this.#args[this.#args.length - 1]
  }
}

module.exports = { Commander }
