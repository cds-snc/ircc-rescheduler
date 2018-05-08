const {
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLNonNull,
} = require('graphql')

module.exports.default = t => {
  const RescheduleFormInput = new GraphQLInputObjectType({
    name: 'RescheduleForm',
    description: t('types.rescheduleForm.description'),
    fields: () => ({
      fullName: {
        description: t('types.rescheduleForm.fields.fullName'),
        type: new GraphQLNonNull(GraphQLString),
      },
      explanation: {
        description: t('types.rescheduleForm.fields.explanation'),
        type: new GraphQLNonNull(GraphQLString),
      },
      paperFileNumber: {
        description: t('types.rescheduleForm.fields.paperFileNumber'),
        type: new GraphQLNonNull(GraphQLString),
      },
      reason: {
        description: t('types.rescheduleForm.fields.reason'),
        type: new GraphQLNonNull(GraphQLString),
      },
    }),
  })
  return RescheduleFormInput
}
