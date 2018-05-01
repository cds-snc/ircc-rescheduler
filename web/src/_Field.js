import PropTypes from 'prop-types'

const FieldAdapterPropTypes = {
  input: PropTypes.shape({
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
  }),
}

export default FieldAdapterPropTypes
