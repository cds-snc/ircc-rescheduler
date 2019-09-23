import React from 'react'
import PropTypes from 'prop-types'
import FieldAdapterPropTypes from '../_Field'
import { css } from 'emotion'
import { theme, mediaQuery } from '../../styles'

const placeholder = css`
  font-style: italic;
  color: ${theme.colour.grey};
  opacity: 1;
`
const text_input = css`
  font-size: ${theme.font.lg};
  font-family: Helvetica, Arial, sans-serif;
  border: 1.5px solid ${theme.colour.black}};
  outline: 0;
  padding: ${theme.spacing.xs};
  width: 500px;
  border-radius: 8px;

  &:focus {
    border-radius: 5px;
    outline: 3px solid ${theme.colour.focus};
    outline-offset: 0px;
  }

  &[disabled] {
    background: ${theme.colour.greyLight};
    border-color: ${theme.colour.grey};
    cursor: not-allowed;
  }

  :-ms-input-placeholder,
  ::-ms-input-placeholder {
    ${placeholder};
  }

  ::placeholder {
    ${placeholder};
  }

  ${mediaQuery.md(css`
    width: 80%;
  `)};

  ${mediaQuery.sm(css`
    width: 100%;
  `)};
`
const text_area = css`
  ${text_input};

  height: 8em;
  resize: none;
  width: 600px;
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
  ...props
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
      {...props}
    />
  </div>
)

const textProps = {
  children: PropTypes.any.isRequired,
  id: PropTypes.string.isRequired,
  labelledby: PropTypes.string,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  value: PropTypes.string,
}

TextField.propTypes = textProps

const TextFieldAdapter = ({ input, ...rest }) => (
  <TextField {...input} {...rest} />
)

TextFieldAdapter.propTypes = FieldAdapterPropTypes

const TextArea = ({
  name,
  id,
  labelledby,
  value,
  children,
  onBlur,
  onChange,
  onFocus,
  ...props
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
      {...props}
    />
  </div>
)

TextArea.propTypes = textProps

const TextAreaAdapter = ({ input, ...rest }) => (
  <TextArea {...input} {...rest} />
)

TextAreaAdapter.propTypes = FieldAdapterPropTypes

export { TextField, TextFieldAdapter, TextArea, TextAreaAdapter }
