import styled, { css } from 'react-emotion'

/*This function is usually for hover events and such
  col: is the color in hex
  amt: is how much you want to darken or lighten, 20 is a good start.
*/
export const incrementColor = (col, amt) => {
  let usePound = false

  if (col[0] === '#') {
    col = col.slice(1)
    usePound = true
  }
  let num = parseInt(col, 16)
  let r = (num >> 16) + amt

  if (r > 255) r = 255
  else if (r < 0) r = 0

  let b = ((num >> 8) & 0x00ff) + amt

  if (b > 255) b = 255
  else if (b < 0) b = 0

  let g = (num & 0x0000ff) + amt

  if (g > 255) g = 255
  else if (g < 0) g = 0

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16)
}

export const breakpoints = {
  xs: 481,
  sm: 578,
  md: 764,
  base: 764,
  lg: 992,
  xl: 1325,
}

export const theme = {
  colour: {
    blue: '#335075',
    red: '#E8112D',
    green: '#00823B',
    greenDark: '#00692f',
    redFIP: '#FF0000',
    grey: '#4A4A4A',
    gray: '#4A4A4A',
    greyLight: '#DBDBDB',
    grayLight: '#DBDBDB',
    greyVeryLight: '#F5F5F5',
    grayVeryLight: '#F5F5F5',
    white: '#FFFFFF',
    black: '#000000',
    focus: '#FFBF47',
    link: '#0000EE',
    visited: '#551A8B',
    alpha: '#F90277',
  },
  font: {
    xs: '0.694rem',
    sm: '0.833rem',
    base: '1rem',
    md: '1rem',
    lg: '1.2rem',
    xl: '1.44rem',
    xxl: '1.728rem',
    xxxl: '1.602rem',
  },
  spacing: {
    xxs: '0.17rem',
    xs: '0.33rem',
    sm: '0.5rem',
    md: '1.0rem',
    base: '1.0rem',
    lg: '1.3rem',
    xl: '2rem',
    xxl: '3rem',
    xxxl: '4.5rem',
  },
}

/* eslint-disable security/detect-object-injection */

export const mediaQuery = Object.keys(breakpoints).reduce(
  (accumulator, label) => {
    let prefix = typeof breakpoints[label] === 'string' ? '' : 'max-width:'
    let suffix = typeof breakpoints[label] === 'string' ? '' : 'px'
    accumulator[label] = cls =>
      css`
        @media screen and (${prefix + breakpoints[label] + suffix}) {
          ${cls};
        }
      `
    return accumulator
  },
  {},
)

export const roundedEdges = css`
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
`

export const focusRing = css`
  &:focus {
    outline: 3px solid ${theme.colour.focus};
  }
`

/*
 * Hide only visually, but have it
 * available for screenreaders
 */
export const visuallyhidden = css`
  border: 0;
  clip: rect(0 0 0 0);
  height: auto;
  margin: 0;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
`

export const visuallyhiddenMobile = css`
  ${mediaQuery.sm(css`
    ${visuallyhidden};
  `)};
`

/* eslint-enable security/detect-object-injection */

export const H1 = styled.h1`
  font-size: ${theme.font.xxl};
  font-weight: bold;
`

export const H2 = styled.h2`
  font-size: ${theme.font.lg};
  font-weight: bold;
  margin-bottom: 0em;
`

export const H3 = styled.h3`
  font-size: ${theme.font.md};
  font-weight: bold;
`

const contentSpacing = css`
  width: 80%;

  ${mediaQuery.md(css`
    width: 100%;
  `)};
`

export const Content = styled.div`
  padding: ${theme.spacing.xl} ${theme.spacing.xxxl} ${theme.spacing.xxl}
    ${theme.spacing.xxxl};
  width: 100%;
  background-color: ${theme.colour.greyVeryLight};
  box-sizing: border-box;
  ${mediaQuery.sm(css`
    padding: ${theme.spacing.xl};
  `)};

  > form {
    ${contentSpacing};
  }

  > section,
  > div {
    ${contentSpacing};
    margin-bottom: ${theme.spacing.lg};
  }

  h2 {
    margin-top: ${theme.spacing.lg};
  }

  p {
    font-size: ${theme.font.lg};
  }
`

export const Bold = styled.strong`
  font-weight: bold;
`

export const Calendar = styled.div`
  height: 30em;
  width: 60em;
  background: ${theme.colour.greyLight};
`

export const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;

  > div {
    margin-left: ${theme.spacing.xxxl};
  }

  ${mediaQuery.xs(css`
    text-align: center;
    flex-direction: column;

    > a,
    > div {
      width: 100%;
    }

    > div {
      margin-left: 0;
      margin-top: ${theme.spacing.xl};
    }
  `)};
`
export const TopContainer = styled.div`
  margin-bottom: ${theme.spacing.lg};
`

export const change = css`
  position: relative;
  right: 1.2rem;

  ${mediaQuery.sm(css`
    right: 0rem;
  `)};
`
