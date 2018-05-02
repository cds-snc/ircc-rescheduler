module.exports = {
  modify: (config, { target, dev }, webpack) => {
    if (config.devServer) {
      config.devServer.host = '0.0.0.0'
    }
    return config
  },
}
