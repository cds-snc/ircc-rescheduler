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
          let staffParams = await buildParams(staffOptions)
          let applicantParams = await buildParams(applicantOptions)

          try {
            staffResponse = await mailer.sendEmail(staffParams).promise()
            await mailer.sendEmail(applicantParams).promise()
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
