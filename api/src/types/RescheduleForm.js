const {
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLNonNull,
} = require('graphql')

module.exports.default = t => {
  const RescheduleFormInput = new GraphQLInputObjectType({
    name: 'RescheduleForm',
    description:
      t('types.rescheduleForm.description'),
    fields: () => ({
      fullName: {
        type: new GraphQLNonNull(GraphQLString),
      },
      explanation: {
        type: new GraphQLNonNull(GraphQLString),
      },
      paperFileNumber: {
        type: new GraphQLNonNull(GraphQLString),
      },
      reason: {
        type: new GraphQLNonNull(GraphQLString),
      },
    }),
  })
  return RescheduleFormInput
}
