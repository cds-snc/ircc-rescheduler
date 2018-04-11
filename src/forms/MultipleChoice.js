import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'
import { css } from 'react-emotion'
import { theme, roundedEdges, mediaQuery } from '../styles'

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
  font-family: ${theme.weight.m};

  input {
    width: 24px;
    height: 24px;
  }

  label {
    display: inline-block;
    padding: 0;
    height: ${theme.spacing.xl};
    font-size: ${theme.font.lg};
    /* this is a bit of a hack */
    line-height: 1.8;

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
      font-size: ${theme.font.md};

      > span {
        padding-left: 0;
      }
    }
  `)};
`

const radio = css`
  ${cds_multiple_choice};

  input[type='radio'] + label::before {
    border: 2px solid ${theme.colour.grey};
    width: 22px;
    height: 22px;
    top: 2px;
    left: 0;
  }

  input[type='radio'] + label::after {
    border: 6px solid ${theme.colour.black};
    top: 9px;
    left: 7px;
  }

  ${mediaQuery.small(css`
    input[type='radio'] + label::before {
      width: 20px;
      height: 20px;
    }

    input[type='radio'] + label::after {
      top: 8px;
      left: 6px;
    }
  `)};
`

const Radio = ({ label, value, name, id, children }) => (
  <div
    className={css`
      ${govuk_multiple_choice} ${radio};
    `}
  >
    <Field type="radio" component="input" name={name} id={id} value={value} />
    <label htmlFor={id} className={govuk_label_pseudo_elements}>
      {label}
    </label>
    {children}
  </div>
)

const checkbox = css`
  ${cds_multiple_choice};

  input[type='checkbox'] + label::before {
    border: 2px solid ${theme.colour.grey};
    width: 22px;
    height: 22px;
    top: 2px;
    left: 0;
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

const Checkbox = ({ label, value, name, id, children }) => (
  <div
    className={css`
      ${govuk_multiple_choice} ${checkbox};
    `}
  >
    <Field
      type="checkbox"
      component="input"
      name={name}
      id={id}
      value={value}
    />
    <label htmlFor={id} className={govuk_label_pseudo_elements}>
      {label}
      {children}
    </label>
  </div>
)

let defaultProps = {
  label: PropTypes.element.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string,
  id: PropTypes.string,
  children: PropTypes.any,
}

Radio.propTypes = defaultProps
Checkbox.propTypes = defaultProps

export { Radio, Checkbox }
