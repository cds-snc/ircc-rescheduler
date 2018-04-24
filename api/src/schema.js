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
          { mailer, receivingAddress, sendingAddress },
        ) => {
          let { paperFileNumber, explanation, fullName, reason } = input
          var params = {
            Destination: {
              ToAddresses: [receivingAddress],
            },
            Message: {
              Body: {
                Html: {
                  Charset: 'UTF-8',
                  Data: `
  ${fullName} requested a new Citizenship Test appointment.
  <ul>
    <li>Full Name: ${fullName}</li>
    <li>Paper File Number: #${paperFileNumber}</li>
    <li>Reason for rescheduling: ${reason}</li>
    <li>Explanation: ${explanation}</li>
  </ul>
                  `,
                },
                Text: {
                  Charset: 'UTF-8',
                  Data: `
  ${fullName} requested a new Citizenship Test appointment.
    * Full Name: ${fullName}
    * Paper File Number: #${paperFileNumber}
    * Reason for rescheduling: ${reason}
    * Explanation: ${explanation}
                  `,
                },
              },
              Subject: {
                Charset: 'UTF-8',
                Data: 'IRCC Citizenship Rescheduling Tool',
              },
            },
            Source: sendingAddress,
            ReplyToAddresses: [sendingAddress],
          }

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
