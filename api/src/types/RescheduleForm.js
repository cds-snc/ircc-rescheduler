const {
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLList,
} = require('graphql')
const { GraphQLDate } = require('graphql-iso-date')

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
      availability: {
        description: t('types.rescheduleForm.fields.availability'),
        type: new GraphQLList(new GraphQLNonNull(GraphQLDate)),
      },
    }),
  })
  return RescheduleFormInput
}
