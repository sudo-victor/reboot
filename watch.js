const { Watch } = require("./lib/watch")
const path = require("path")

const fileByCLI = process.argv[2]
const file = path.join(__dirname, fileByCLI)

const watchman = Watch.compile(process.cwd(), file)
