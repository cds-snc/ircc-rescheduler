const sgMail = require('@sendgrid/mail')
const Server = require('./src/server').default

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const server = Server({
  mailer: sgMail,
  receivingAddress: process.env.IRCC_RECEIVING_ADDRESS,
})

server.listen(3001)
