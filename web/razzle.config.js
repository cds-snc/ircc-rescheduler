module.exports = {
  modify: (config, { target, dev }, webpack) => {
    
    /* Ignore so we don't include these in the bundle */
    config.plugins.push(
      new webpack.IgnorePlugin(/^\.\/(?!en)(.+)$/, /validatorjs\/src\/lang/),
    )
    config.plugins.push(
      new webpack.IgnorePlugin(/EnerguideLogo/, /@cdssnc\/gcui\/dist/),
    )
    config.plugins.push(
      new webpack.IgnorePlugin(/UpwardChevron/, /@cdssnc\/gcui\/dist/),
    )
    config.plugins.push(
      new webpack.IgnorePlugin(/DownwardChevron/, /@cdssnc\/gcui\/dist/),
    )

    if (process.env.CI) config.performance = { hints: false }
    if (config.devServer) {
      config.devServer.host = '0.0.0.0'
    }
    if (process.env.RAZZLE_STAGE) {
      config.devtool = 'source-map'
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
