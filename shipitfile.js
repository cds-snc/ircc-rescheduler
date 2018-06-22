module.exports = shipit => {
  // Load shipit-deploy tasks
  require('shipit-deploy')(shipit)
  require('shipit-npm')(shipit);

  shipit.initConfig({
    default: {
      branch: 'master',
      deployTo: '/home/ircc/ircc-rescheduler',
      repositoryUrl: 'https://github.com/cds-snc/ircc-rescheduler.git',
    },
    dev: {
      servers: 'ircc@ircc-vm-2.canadacentral.cloudapp.azure.com',
    },
  })

  shipit.remote('ls -al');
}
