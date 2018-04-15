import React from 'react'
import PropTypes from 'prop-types'
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
const text_area = css`
  ${text_input};

  height: 10em;
  resize: none;
  width: 550px;
  margin-top: ${theme.spacing.sm};
`
const TextField = ({
  name,
  id,
  labelledby,
  value,
  children,
  onBlur,
  onChange,
  onFocus,
}) => (
  <div>
    {children}
    <input
      type="text"
      name={name}
      id={id}
      aria-labelledby={labelledby}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      className={text_input}
    />
  </div>
)

TextField.propTypes = {
  children: PropTypes.any.isRequired,
  id: PropTypes.string.isRequired,
  labelledby: PropTypes.string,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  value: PropTypes.string,
}

const TextFieldAdapter = ({ input, ...rest }) => (
  <TextField {...input} {...rest} />
)

TextFieldAdapter.propTypes = {
  input: PropTypes.object.isRequired,
}

const TextArea = ({
  name,
  id,
  labelledby,
  value,
  children,
  onBlur,
  onChange,
  onFocus,
}) => (
  <div>
    {children}
    <textarea
      name={name}
      id={id}
      aria-labelledby={labelledby}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      className={text_area}
    />
  </div>
)

TextArea.propTypes = TextField.propTypes

const TextAreaAdapter = ({ input, ...rest }) => (
  <TextArea {...input} {...rest} />
)

TextAreaAdapter.propTypes = TextFieldAdapter.propTypes

export { TextField, TextFieldAdapter, TextArea, TextAreaAdapter }
