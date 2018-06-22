const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql')
const { GraphQLError } = require('graphql/error')

const createSchema = t => {
  const MailResponse = require('./types/MailResponse').default(t)
  const RescheduleFormInput = require('./types/RescheduleForm').default(t)
  const buildParams = require('./email')

  // XXX: Is it not possible to have a mutation only schema?
  var query = new GraphQLObjectType({
    name: 'Query',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => 'world',
      },
    },
  })

  var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      decline: {
        description: t('mutation.fields.decline.description'),
        args: {
          input: {
            description: t('mutation.fields.decline.args.uci'),
            type: new GraphQLNonNull(RescheduleFormInput),
          },
        },
        type: MailResponse,
        resolve: async (
          _,
          { input },
          { mailer, receivingAddress, sendingAddress, siteUrl },
        ) => {
          let { availability } = input

          if (availability.length !== 3)
            return new GraphQLError(t('errors.threeDatesRequired'))

          const staffOptions = {
            htmlTemplate: 'staff-rich',
            plainTemplate: 'staff-plain',
            formValues: input,
            url: siteUrl,
            receivingAddress,
            sendingAddress,
          }

          const applicantOptions = {
            htmlTemplate: 'applicant-rich',
            plainTemplate: 'applicant-plain',
            formValues: input,
            url: siteUrl,
            receivingAddress: input.email,
            sendingAddress,
          }

          let staffResponse
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          // let applicantResponse
=======
          let applicantResponse
>>>>>>> b3a9897... applicant email
=======
          let applicantResponse
>>>>>>> c090dde... applicant email
=======
>>>>>>> 773fcfb349f25d2957a6bdd30e9235d4c0484c29
          let staffParams = await buildParams(staffOptions)
          let applicantParams = await buildParams(applicantOptions)

          try {
            staffResponse = await mailer.sendEmail(staffParams).promise()

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            await mailer.sendEmail(applicantParams).promise()
=======
            applicantResponse = await mailer
              .sendEmail(applicantParams)
              .promise()
>>>>>>> b3a9897... applicant email
=======
            applicantResponse = await mailer
              .sendEmail(applicantParams)
              .promise()
>>>>>>> c090dde... applicant email
=======
            await mailer
              .sendEmail(applicantParams)
              .promise()
>>>>>>> 773fcfb349f25d2957a6bdd30e9235d4c0484c29
            return staffResponse
          } catch (e) {
            return new GraphQLError(e.message)
          }
        },
      },
    }),
  })

  return new GraphQLSchema({ query, mutation })
}

module.exports.default = createSchema
