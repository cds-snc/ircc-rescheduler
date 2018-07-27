module.exports = {
  modify: (config, { target, dev }, webpack) => {
    if (process.env.CI) config.performance = { hints: false }
    if (config.devServer) {
      config.devServer.host = '0.0.0.0'
    }
    if (process.env.BUNDLE_CHECK) {
      /* This allows us to analyze the the webpack bundle of all our apis and imports. 
        You can change the analyzerMode to be 'server' and this may let you see more info like
        what the files looked gzipped,parsed and standard etc.. */
      const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
        .BundleAnalyzerPlugin
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          generateStatsFile: true,
          reportFilename:
            target === 'web'
              ? '../../reports/sourceReport.html'
              : '../reports/modulesReport.html',
          statsFilename:
            target === 'web'
              ? '../../reports/sourceStats.json'
              : '../reports/modulesStats.json',
        }),
      )
    }
    return config
  },
}
