const { GraphQLObjectType, GraphQLString } = require('graphql')

const createMailResponse = t => {
  const MailResponse = new GraphQLObjectType({
    name: 'MailResponse',
    description: t('types.receipt.description'),
    fields: () => ({
      requestId: {
        type: GraphQLString,
        description: t('types.mailResponse.messageid'),
        resolve: root => root.ResponseMetadata.RequestId,
      },
      messageId: {
        type: GraphQLString,
        description: t('types.mailResponse.statusCode'),
        resolve: root => root.MessageId,
      },
    }),
  })

  return MailResponse
}

module.exports.default = createMailResponse
