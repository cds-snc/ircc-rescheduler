export const vancouver = {
  email: 'IRCC.DNCitVANNotification-NotificationVANCitRN.IRCC@cic.gc.ca',
  phone: '1-888-242-2100',
  recurring: {
    jun: ['wed', 'thurs'],
    jul: ['wed', 'thurs'],
    aug: ['wed', 'thurs'],
    sep: ['wed', 'thurs'],
    oct: ['tues', 'wed'],
    nov: ['tues', 'wed'],
    dec: ['tues', 'wed'],
  },
  blocked: '', // use CSV format => 2018-10-02, 2018-10-03, 2018-11-21
}

export const getEmail = (location = vancouver) => {
  if (location && location.email) {
    return location.email
  }
}

export const getEmailParts = (location = vancouver) => {
  const email = getEmail(location)
  let split = email.split('@')
  return split
}

export const getPhone = (location = vancouver) => {
  if (location && location.phone) {
    return location.phone
  }
}
