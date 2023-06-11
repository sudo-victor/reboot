const { WatchBuilder } = require("./lib/watch")

const watchman = new WatchBuilder()

watchman.build(process.cwd())