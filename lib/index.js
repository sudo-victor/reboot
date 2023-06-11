const { Reboot } = require("./controllers/Reboot")
const { Commander } = require("./controllers/Commander")

const commander = new Commander(process.argv)

const options = {
  mainFile: commander.getMainFile(),
  observedDir: commander.getMainDir()
}

Reboot.listen(options)
