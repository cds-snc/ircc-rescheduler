module.exports = shipit => {
  // Load shipit-deploy tasks
  require('shipit-deploy')(shipit)
  require('shipit-npm')(shipit)
  require('shipit-shared')(shipit)

  shipit.initConfig({
    default: {
      branch: 'master',
      repositoryUrl: 'https://github.com/cds-snc/ircc-rescheduler.git',
      shared: {
        overwrite: true,
        files: ['web/.env.production', 'web/.env'],
      },
    },
    dev: {
      deployTo: '/home/ubuntu/ircc-rescheduler',
      key: 'ircc-vm.pem',
      servers: [
        {
          host: '35.183.124.35',
          user: 'ubuntu',
        },
      ],
    },
    production: {
      branch: 'master',
      deployTo: '/home/ubuntu/ircc-rescheduler',
      key: 'ircc-vm.pem',
      servers: [
        {
          host: '35.183.87.90',
          user: 'ubuntu',
        },
      ],
    },
  })

  shipit.blTask('installDependencies', async () => {
    await shipit.log('Building the stuff in ' + shipit.releasePath)
    let uploadSourceMaps =
      shipit.environment === 'production'
        ? ' && yarn sm:production'
        : ' && yarn sm:staging'
    await shipit.remote(
      `cd ${
        shipit.releasePath
      }/web && yarn install --production && yarn build ${uploadSourceMaps}`,
    )
  })

  shipit.blTask('startOrRestart', async () => {
    var path = shipit.config.deployTo + '/current'
    await shipit.remote(
      'cd ' +
        path +
        ' && pwd && pm2 startOrRestart ecosystem.config.js --env production --update-env',
    )
  })

  shipit.on('updated', function() {
    return shipit.start(['installDependencies'])
  })

  shipit.on('deployed', function() {
    return shipit.start('startOrRestart')
  })
}
