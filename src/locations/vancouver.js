module.exports = {
  id: 'vancouver',
  email: 'IRCC.DNCitVANNotification-NotificationVANCitRN.IRCC@cic.gc.ca',
  phone: '1-888-242-2100',
  receivingEmail: 'IRCC.DNCitVANNotification-NotificationVANCitRN.IRCC@cic.gc.ca',
  recurring: {
    jan: ['tues', 'wed'],
    feb: ['tues', 'wed'],
    mar: ['tues', 'wed'],
    apr: ['tues', 'wed'],
    jun: ['tues', 'wed'],
    jul: ['tues', 'wed'],
    aug: ['tues', 'wed'],
    sep: ['tues', 'wed'],
    oct: ['tues', 'wed'],
    nov: ['tues', 'wed'],
    dec: ['tues', 'wed'],
  },
  blocked: '', // use CSV format => 2018-10-02, 2018-10-03, 2018-11-21
}
