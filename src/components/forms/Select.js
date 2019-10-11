import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'
import { theme, mediaQuery } from '../../styles'

const govuk_select = css`
  border: 0.8px solid ${theme.colour.grey}};
  border-radius: 5px;
  font-family: SourceSans, Helvetica, Arial, sans-serif;
  font-size: ${theme.font.base};
  background: ${theme.colour.white};
  line-height: 1.4;

  margin-bottom: 2em;
  width: 95%;
  max-width: 500px;
  height: 40px;
  select {
    display: none;
  }
  option {
    background-color: ${theme.colour.white};
  }
  &:focus,
  &:before {
    -webkit-box-shadow: 0 0 0 4px #ffbf47;
    -moz-box-shadow: 0 0 0 4px #ffbf47;
    box-shadow: 0 0 0 4px #ffbf47;
  }

  ${mediaQuery.md(css`
    width: 80%;
  `)};

  ${mediaQuery.sm(css`
    width: 100%;
  `)};
`

class SelectDropDown extends React.Component {
  render() {
    return (
      <select
        className={govuk_select}
        name={this.props.selName}
        id={this.props.selId}
        defaultValue="0"
        onChange={this.props.selOnChange}
        onClick={this.props.selOnClick}
      >
        <option key="0" value="0">
          {this.props.optName1}
        </option>
        {Array.isArray(this.props.optData)
          ? this.props.optData.map(({ name, value }) => (
              <option key={value} value={value}>
                {name}
              </option>
            ))
          : null}
      </select>
    )
  }
}
SelectDropDown.propTypes = {
  selClass: PropTypes.string,
  selName: PropTypes.string,
  selId: PropTypes.string,
  selOnChange: PropTypes.func,
  selOnClick: PropTypes.func,
  optName1: PropTypes.string,
  optData: PropTypes.array,
}

export default SelectDropDown
