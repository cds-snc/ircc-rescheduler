const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql')

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

  // See examples/payment.xml
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
        resolve: async (_, { uci, reason }, context) => {
          const msg = {
            to: context.receivingAddress,
            from: 'test@example.com', // TODO: What to use here? sheduler@? users email?
            subject: 'Declined', // TODO: Choose something that filters nicely.
            text: `User ${uci}, declined with this reason: ${reason}`,
            html: `<strong>User ${uci}, declined with this reason: ${reason}</strong>`,
          }
          let [{ statusCode, headers }, _body] = await context.mailer.send(msg)
          if (statusCode === 202) {
            return {
              statusCode,
              messageID: headers['x-message-id'],
            }
          } else {
            throw new Error(
              'We were not able to process this request. Please try again later.',
            )
          }
        },
      },
    }),
  })

  return new GraphQLSchema({ query, mutation })
}

module.exports.default = createSchema
