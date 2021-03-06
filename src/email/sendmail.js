import AWS from 'aws-sdk'
import { buildParams } from './email-template'
import nodemailer from 'nodemailer'
import { getReceivingEmail } from '../locations'

if (process.env.NODE_ENV !== 'test') {
  if (!process.env.RAZZLE_AWS_REGION)
    throw new Error('process.env.RAZZLE_AWS_REGION was not found')
  if (!process.env.RAZZLE_SENDING_ADDRESS)
    throw new Error('process.env.RAZZLE_SENDING_ADDRESS was not found')
  if (!process.env.RAZZLE_SITE_URL)
    throw new Error('process.env.RAZZLE_SITE_URL was not found')
  if (
    process.env.RAZZLE_STAGE &&
    process.env.RAZZLE_STAGE !== 'production' &&
    !process.env.RAZZLE_IRCC_TEST_RECEIVING_ADDRESS
  )
    throw new Error(
      `process.env.RAZZLE_STAGE is set to ${
        process.env.RAZZLE_STAGE
      } but process.env.RAZZLE_IRCC_TEST_RECEIVING_ADDRESS was not found`,
    )
}

export const getMailer = async () => {
  AWS.config.update({
    region: process.env.RAZZLE_AWS_REGION,
  })
  const mailer = nodemailer.createTransport({
    SES: new AWS.SES({ apiVersion: '2010-12-01' }),
  })

  return mailer
}

export const getEmailParms = async (
  input,
  url = process.env.RAZZLE_SITE_URL || ' ',
  receivingAddress = getReceivingEmail(),
  sendingAddress = process.env.RAZZLE_SENDING_ADDRESS,
) => {
  const staffOptions = {
    htmlTemplate: 'staff-rich',
    plainTemplate: 'staff-plain',
    subject: 'IRCC Citizenship Rescheduling Tool',
    formValues: input,
    url,
    receivingAddress,
    sendingAddress,
  }

  const applicantOptions = {
    htmlTemplate: 'applicant-rich',
    plainTemplate: 'applicant-plain',
    subject:
      'IRCC confirmation of your request / Confirmation d’IRCC de votre demande',
    formValues: input,
    url,
    receivingAddress: input.email,
    sendingAddress,
  }

  let staffParams = await buildParams(staffOptions).catch(e => {
    return e.message
  })
  let applicantParams = await buildParams(applicantOptions).catch(e => {
    return e.message
  })

  return { staffParams, applicantParams }
}

export const cleanDates = days => {
  let split = days.split(',')

  const cleaned = split
    .map(day => {
      return day.trim()
    })
    .sort()

  return cleaned
}

export const sendMail = async (mailer, params) => {
  return new Promise((resolve, reject) => {
    mailer.sendMail(params, (err, info) => {
      if (err) {
        reject(err)
      } else {
        resolve(info)
      }
    })
  })
}
