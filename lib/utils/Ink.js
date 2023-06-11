class Ink {
  static paintGreen(text) {
    return `\x1b[32m${text}\x1b[0m`
  }

  static paintYellow(text) {
    return `\x1b[33m${text}\x1b[0m`
  }

  static paintRed(text) {
    return `\x1b[31m${text}\x1b[0m`
  }
}

module.exports = { Ink }
