const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql')

const createMailResponse = t => {
  const MailResponse = new GraphQLObjectType({
    name: 'MailResponse',
    description: t('types.receipt.description'),
    fields: () => ({
      messageID: {
        type: GraphQLString,
        description: t('types.mailResponse.messageid'),
      },
      statusCode: {
        type: GraphQLInt,
        description: t('types.mailResponse.statusCode'),
      },
    }),
  })

  return MailResponse
}

module.exports.default = createMailResponse
