require('dotenv').config()
const Server = require('./src/server').default
const AWS = require('aws-sdk')

if (!process.env.AWS_REGION)
  throw new Error('AWS_REGION was not found in the environment')
if (!process.env.AWS_SECRET_ACCESS_KEY)
  throw new Error('AWS_SECRET_ACCESS_KEY was not found in the environment')
if (!process.env.AWS_ACCESS_KEY_ID)
  throw new Error('AWS_ACCESS_KEY_ID was not found in the environment')
if (!process.env.IRCC_RECEIVING_ADDRESS)
  throw new Error('IRCC_RECEIVING_ADDRESS was not found in the environment')
if (!process.env.SENDING_ADDRESS)
  throw new Error('SENDING_ADDRESS was not found in the environment')

AWS.config.update({ region: process.env.AWS_REGION })

const server = Server({
  mailer: new AWS.SES({ apiVersion: '2010-12-01' }),
  receivingAddress: process.env.IRCC_RECEIVING_ADDRESS,
  sendingAddress: process.env.SENDING_ADDRESS,
})

server.listen(3001)
