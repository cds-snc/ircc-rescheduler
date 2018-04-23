const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql')
const { GraphQLError } = require('graphql/error')

const createSchema = t => {
  const MailResponse = require('./types/MailResponse').default(t)

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
          uci: {
            description: t('mutation.fields.decline.args.uci'),
            type: new GraphQLNonNull(GraphQLString),
          },
          reason: {
            description: t('mutation.fields.decline.args.reason'),
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        type: MailResponse,
        resolve: async (
          _,
          { uci, reason },
          { mailer, receivingAddress, sendingAddress },
        ) => {
          let params = {
            Destination: {
              ToAddresses: [receivingAddress],
            },
            Message: {
              Body: {
                Html: {
                  Charset: 'UTF-8',
                  Data: `<strong>User ${uci}, declined with this reason: ${
                    reason
                  }</strong>`,
                },
                Text: {
                  Charset: 'UTF-8',
                  Data: `User ${uci}, declined with this reason: ${reason}`,
                },
              },
              Subject: {
                Charset: 'UTF-8',
                Data: 'Test email',
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
