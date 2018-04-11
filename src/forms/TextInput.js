import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'
import { css } from 'react-emotion'
import { theme, mediaQuery } from '../styles'

const text_input = css`
  font-size: ${theme.font.lg};
  border: 3px solid ${theme.colour.black}};
  outline: 0;
  padding: ${theme.spacing.xs};
  width: 400px;

  &:focus {
    outline: 3px solid ${theme.colour.focus};
    outline-offset: 0px;
  }

  ${mediaQuery.xs(css`
    width: 100%;
  `)};
`

const TextInput = ({ name, id, labelledby, children }) => (
  <div>
    {children}
    <Field
      type="text"
      component="input"
      name={name}
      id={id}
      aria-labelledby={labelledby}
      className={text_input}
    />
  </div>
)

TextInput.propTypes = {
  children: PropTypes.any.isRequired,
  id: PropTypes.string.isRequired,
  labelledby: PropTypes.string,
  name: PropTypes.string.isRequired,
}

export default TextInput
