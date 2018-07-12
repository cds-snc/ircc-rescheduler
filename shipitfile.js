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
        files: [
          'api/.env',
          'api/src/email_templates/CanWordmark.png',
          'web/.env.production',
          'web/.env',
        ],
      },
    },
    dev: {
      deployTo: '/home/ircc/ircc-rescheduler',
      servers: 'ircc@ircc-vm-2.canadacentral.cloudapp.azure.com',
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
