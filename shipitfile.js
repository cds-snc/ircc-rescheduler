module.exports = shipit => {
  // Load shipit-deploy tasks
  require('shipit-deploy')(shipit)
  require('shipit-npm')(shipit)
  require('shipit-shared')(shipit)

  shipit.initConfig({
    default: {
      branch: 'master',
      deployTo: '/home/ircc/ircc-rescheduler',
      repositoryUrl: 'https://github.com/cds-snc/ircc-rescheduler.git',
      shared: {
        overwrite: true,
        files: ['api/.env', 'web/.env.production'],
      },
    },
    dev: {
      servers: 'ircc@ircc-vm-2.canadacentral.cloudapp.azure.com',
    },
  })
}
