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
}
