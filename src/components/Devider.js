import React from 'react'
// import { css } from 'emotion'
import styled from '@emotion/styled'

// import { theme, horizontalPadding, mediaQuery } from '../styles'


// const container = css`
//   html:not(.development):not(.staging) & {
//     display: none;
//   }

//   ${horizontalPadding};
//   padding-top: ${theme.spacing.xxs};
//   padding-bottom: ${theme.spacing.xxs};
//   background-color: ${theme.colour.blue};

//   ${mediaQuery.sm(css`
//     padding-top: ${theme.spacing.md};
//     padding-bottom: ${theme.spacing.md};
//   `)};
// `

const TopBar = styled.hr(
  {
    height: '0.1em',
    border: 'none',
    margin: 0,
    background: 'light-grey',
  },
  props => ({ background: props.background }),
)


const Devider = (topBarBackground) => (
  <div>
     {topBarBackground ? <TopBar background={topBarBackground} /> : ''}
   </div>
)

export default Devider
