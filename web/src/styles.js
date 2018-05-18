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

export const roundedEdges = css`
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
`

/*
 * Hide only visually, but have it
 * available for screenreaders
 */
export const visuallyhidden = css`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`

export const breakpoints = {
  xs: 481,
  small: 576,
  medSmall: 600,
  medium: 764,
  large: 992,
  xLarge: 1500,
  xxl: 3000,
}

export const theme = {
  colour: {
    blue: '#335075',
    red: '#A5071B',
    green: '#00823B',
    redFIP: '#FF0000',
    grey: '#4A4A4A',
    gray: '#4A4A4A',
    greyLight: '#DBDBDB',
    grayLight: '#DBDBDB',
    greyVeryLight: '#f5f5f5',
    grayVeryLight: '#f5f5f5',
    white: '#FFFFFF',
    black: '#000000',
    focus: '#ffbf47',
    visited: '#551a8b',
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

export const Content = styled.div`
  padding: ${theme.spacing.xl} ${theme.spacing.xxxl} ${theme.spacing.xxl}
    ${theme.spacing.xxxl};
  width: 100%;
  background-color: ${theme.colour.greyVeryLight};
  box-sizing: border-box;
  ${mediaQuery.small(css`
    padding: ${theme.spacing.xl};
  `)};

  section {
    width: 80%;
    margin-bottom: ${theme.spacing.lg};

    ${mediaQuery.small(css`
      width: 100%;
    `)};
  }

  h2,
  h3 {
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

export const CalHeader = styled.div`
  width: 32em;
  font-size: ${theme.font.lg};
  padding-bottom: ${theme.spacing.xl};
  ${mediaQuery.medium(css`
    width: 100%;
  `)};
`

export const CalReminder = styled.div`
  font-size: ${theme.font.lg};
  padding: ${theme.spacing.xl} 0 ${theme.spacing.lg} 0;
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

  ${mediaQuery.small(css`
    right: 0rem;
  `)};
`

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px dashed ${theme.colour.greyLight};
  padding-top: ${theme.spacing.md};
  padding-bottom: ${theme.spacing.md};
  ${mediaQuery.small(css`
    display: block;
  `)};

  li,
  p {
    padding-bottom: 0;
    margin-bottom: ${theme.spacing.xs};
  }
`

export const Column1 = styled.div`
  width: 25%;

  ${mediaQuery.small(css`
    width: 100%;
  `)};
`

export const Column2 = styled.div`
  width: 35%;

  ${mediaQuery.small(css`
    width: 100%;
    margin-bottom: ${theme.spacing.md};
  `)};
`

export const Column3 = styled.div`
  width: 6em;
  text-align: right;

  ${mediaQuery.small(css`
    text-align: left;
  `)};
`
