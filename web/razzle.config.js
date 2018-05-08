module.exports = {
  modify: (config, { target, dev }, webpack) => {
    if (process.env.CI) config.performance = { hints: false }
    if (config.devServer) {
      config.devServer.host = '0.0.0.0'
    }
    return config
  },
}
