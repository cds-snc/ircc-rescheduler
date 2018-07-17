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

  shipit.blTask('installDeps', function() {
    shipit.log('Building the stuff in ' + shipit.releasePath)
    shipit.remote('cd ' + shipit.releasePath + ' && yarn build_web')
  })

  shipit.blTask('startOrRestart', function() {
    var path = shipit.config.deployTo + '/current'
    return shipit.remote(
      'cd ' +
        path +
        ' && pwd && pm2 startOrRestart ecosystem.config.js --env production --update-env',
    )
  })

  shipit.on('updated', function() {
    return shipit.start(['installDeps'])
  })

  shipit.on('deployed', function() {
    return shipit.start('startOrRestart')
  })
}
