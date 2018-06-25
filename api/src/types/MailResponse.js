const { GraphQLObjectType, GraphQLString } = require('graphql')

const createMailResponse = t => {
  const MailResponse = new GraphQLObjectType({
    name: 'MailResponse',
    description: t('types.receipt.description'),
    fields: () => ({
      requestId: {
        type: GraphQLString,
        description: t('types.mailResponse.messageid'),
        resolve: root => root.response,
      },
      messageId: {
        type: GraphQLString,
        description: t('types.mailResponse.statusCode'),
        resolve: root => root.messageId,
      },
    }),
  })

  return MailResponse
}

module.exports.default = createMailResponse
