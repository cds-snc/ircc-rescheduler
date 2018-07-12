import AWS from 'aws-sdk'
import { buildParams } from './email-template'
import nodemailer from 'nodemailer'

if (process.env.NODE_ENV !== 'test') {
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
  if (typeof process.env.SITE_URL === 'undefined')
    throw new Error('SITE_URL was not found in the environment')
}

export const getMailer = async () => {
  AWS.config.update({ region: process.env.AWS_REGION })
  const mailer = nodemailer.createTransport({
    SES: new AWS.SES({ apiVersion: '2010-12-01' }),
  })

  return mailer
}

export const getEmailParms = async (
  input,
  url = process.env.SITE_URL,
  receivingAddress = process.env.IRCC_RECEIVING_ADDRESS,
  sendingAddress = process.env.SENDING_ADDRESS,
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

export const cleanDates = (input) => {
  let split = input.selectedDays.split(',')

  const cleaned = split
    .map(day => {
      return day.trim()
    })
    .sort()

  input.selectedDays = cleaned
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
