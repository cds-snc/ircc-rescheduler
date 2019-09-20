import React from 'react'
import { css } from 'emotion'
import styled from '@emotion/styled'

import { theme, horizontalPadding } from '../styles'

const container = css`
  ${horizontalPadding};
  width: auto;
  justify-content: space-between;
  background-color: ${theme.colour.white};
`

const TopBar = styled.hr(
  {
    height: '0.065em',
    border: 'none',
    margin: 0,
    background: '#333333',
  },
  props => ({ background: props.background }),
)

const Devider = topBarBackground => (
  <div className={container}>
    <div>
      {topBarBackground ? <TopBar background={topBarBackground} /> : ''}
    </div>
  </div>
)

export default Devider
