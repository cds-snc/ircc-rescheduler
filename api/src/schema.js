const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql')
const { GraphQLError } = require('graphql/error')

function humanReadable(dates) {
  return dates.map(date =>
    new Date(date).toLocaleDateString('en-CA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  )
}

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
          let {
            paperFileNumber,
            explanation,
            fullName,
            reason,
            availability,
          } = input

          if (availability.length !== 3)
            return new GraphQLError(t('errors.threeDatesRequired'))

          const options = {
            htmlTemplate: '_test-rich',
            plainTemplate: '_test-plain',
            formValues: input,
            url: siteUrl,
            receivingAddress,
            sendingAddress,
          }
          //

          params = await buildParams(options)

          let response
          try {
            response = await mailer.sendEmail(params).promise()
            return response
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
