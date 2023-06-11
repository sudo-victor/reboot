const { Watch } = require("./lib/Watch")
const path = require("path")

const fileByCLI = process.argv[2]
const file = path.join(__dirname, fileByCLI)

const options = {
  mainFile: file,
  observedDir: process.cwd()
}

Watch.listen(options)
