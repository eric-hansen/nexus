import StandaloneLayout from "./layout"
import ConfigsPlugin from "plugins/configs"

// the Standalone preset

let preset = [
  ConfigsPlugin,
  () => {
    return {
      components: { StandaloneLayout }
    }
  }
]

module.exports = preset
