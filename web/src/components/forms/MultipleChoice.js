import React from 'react'
import PropTypes from 'prop-types'
import FieldAdapterPropTypes from '../_Field'
import { css } from 'react-emotion'
import { theme, roundedEdges, mediaQuery } from '../../styles'

const govuk_multiple_choice = css`
  display: block;
  float: none;
  clear: left;
  position: relative;
  padding: 0 0 0 38px;
  margin-bottom: 10px;

  input {
    position: absolute;
    cursor: pointer;
    left: 0;
    top: 0;
    width: 38px;
    height: 38px;
    z-index: 1;
    margin: 0;
    zoom: 1;
    filter: alpha(opacity=0);
    opacity: 0;
  }

  label {
    cursor: pointer;
    padding: 8px 10px 9px 12px;
    display: block;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
  }

  input:disabled {
    cursor: default;
  }

  input:disabled + label {
    zoom: 1;
    filter: alpha(opacity=50);
    opacity: 0.5;
    cursor: default;
  }
`

const govuk_label_pseudo_elements = css`
  input[type='radio'] + &::before {
    content: '';
    border: 2px solid;
    background: transparent;
    width: 34px;
    height: 34px;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }

  input[type='radio'] + &::after {
    content: '';
    border: 10px solid;
    width: 0;
    height: 0;
    position: absolute;
    top: 9px;
    left: 9px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    zoom: 1;
    filter: alpha(opacity=0);
    opacity: 0;
  }

  input[type='checkbox'] + &::before {
    content: '';
    border: 2px solid;
    background: transparent;
    width: 34px;
    height: 34px;
    position: absolute;
    top: 0;
    left: 0;
  }

  input[type='checkbox'] + &::after {
    content: '';
    border: solid;
    border-width: 0 0 5px 5px;
    background: transparent;
    border-top-color: transparent;
    width: 17px;
    height: 7px;
    position: absolute;
    top: 10px;
    left: 8px;
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
    zoom: 1;
    filter: alpha(opacity=0);
    opacity: 0;
  }

  input[type='radio']:focus + &::before {
    -webkit-box-shadow: 0 0 0 4px #ffbf47;
    -moz-box-shadow: 0 0 0 4px #ffbf47;
    box-shadow: 0 0 0 4px #ffbf47;
  }

  input[type='checkbox']:focus + &::before {
    -webkit-box-shadow: 0 0 0 3px #ffbf47;
    -moz-box-shadow: 0 0 0 3px #ffbf47;
    box-shadow: 0 0 0 3px #ffbf47;
  }

  input:checked + &::after {
    zoom: 1;
    filter: alpha(opacity=100);
    opacity: 1;
  }
`

const cds_multiple_choice = css`
  padding: 0 0 0 ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.sm};
  input {
    width: 24px;
    height: 24px;
  }
  label {
    display: inline-block;
    padding: 0;
    height: initial;
    font-size: ${theme.font.lg};
    > span {
      padding: 0 ${theme.spacing.sm} 0 ${theme.spacing.xs};
    }
  }
  ${mediaQuery.small(css`
    margin-bottom: ${theme.spacing.md};
    input {
      width: 22px;
      height: 22px;
    }
    label {
      font-size: ${theme.font.lg};
      > span {
        padding-left: 0;
      }
    }
  `)};
`

const radio = css`
  ${govuk_multiple_choice};
  ${cds_multiple_choice};

  input[type='radio'] + label::before {
    border: 2px solid ${theme.colour.black};
    background-color: ${theme.colour.white};
    width: 22px;
    height: 22px;
    top: 6px;
    left: 0;
  }
  input[type='radio'] + label::after {
    border: 6px solid ${theme.colour.black};
    top: 11px;
    left: 5px;
  }
  ${mediaQuery.small(css`
    input[type='radio'] + label::before {
      width: 20px;
      height: 20px;
      top: 4px;
    }
    input[type='radio'] + label::after {
      top: 8px;
      left: 4px;
    }
  `)};
`

const MultipleChoice = ({
  label,
  value,
  name,
  id,
  children,
  className,
  type,
  onBlur,
  onChange,
  onFocus,
  checked,
}) => (
  <div className={className}>
    <input
      type={type}
      name={name}
      id={id}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      checked={checked}
    />
    <label htmlFor={id} className={govuk_label_pseudo_elements}>
      {label}
    </label>
    {children}
  </div>
)

MultipleChoice.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  label: PropTypes.element.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string,
  id: PropTypes.string,
  children: PropTypes.any,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  checked: PropTypes.bool,
}

const Radio = ({ ...props }) => (
  <MultipleChoice type="radio" className={radio} {...props} />
)

const RadioAdapter = ({ input, ...rest }) => <Radio {...input} {...rest} />

RadioAdapter.propTypes = FieldAdapterPropTypes

const checkbox = css`
  ${govuk_multiple_choice};
  ${cds_multiple_choice};

  input[type='checkbox'] + label::before {
    border: 2px solid ${theme.colour.grey};
    width: 22px;
    height: 22px;
    top: 2px;
    left: 0;
    background-color: ${theme.colour.white};
    ${roundedEdges};
  }

  input[type='checkbox'] + label::after {
    border-width: 0 0 3px 3px;
    width: 14px;
    height: 7px;
    top: 8px;
    left: 4px;
  }
`

const Checkbox = ({ ...props }) => (
  <MultipleChoice type="checkbox" className={checkbox} {...props} />
)

const CheckboxAdapter = ({ input, ...rest }) => (
  <Checkbox {...input} {...rest} />
)

CheckboxAdapter.propTypes = FieldAdapterPropTypes

export { Radio, RadioAdapter, Checkbox, CheckboxAdapter }
