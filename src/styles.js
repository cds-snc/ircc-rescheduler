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

export const fontFace = css`
  @import url(https://fontlibrary.org/face/hk-grotesk);
`

const borderRadius = 2
export const roundedEdges = css`
  -webkit-border-radius: ${borderRadius}px;
  -moz-border-radius: ${borderRadius}px;
  border-radius: ${borderRadius}px;
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
    yellow: '#FDD262',
    yellowLight: '#E5BF73',
    yellowDark: '#E7AE27',
    blue: '#1177DD',
    blueDark: '#073767',
    blueAlpha: '#4A90E2',
    red: '#A5071B',
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
  },
  weight: {
    l: 'HKGroteskLight, sans serif',
    li: 'HKGroteskLightItalic, sans serif',
    m: 'HKGroteskMedium, sans serif',
    mi: 'HKGroteskMediumItalic, sans serif',
    r: 'HKGroteskRegular, sans serif',
    s: 'HKGroteskSemiBold, sans serif',
    b: 'HKGroteskBold, sans serif',
    bi: 'HKGroteskSemiBoldItalic, sans serif',
  },
  font: {
    xs: '0.5rem',
    sm: '0.9rem',
    base: '1rem',
    md: '1.125rem',
    lg: '1.625rem',
    lg2: '2rem',
    xl: '2.25rem',
    xxl: '2.75rem',
  },
  spacing: {
    md: '1.0em',
    sm: '0.5em',
    xs: '0.33em',
    xxs: '0.17em',
    lg: '1.3em',
    xl: '2em',
    xxl: '3em',
    xxxl: '4em',
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
  font-family: ${theme.weight.b};

  ${mediaQuery.medium(css`
    font-size: ${theme.font.lg2};
  `)};
`

export const H2 = styled.h2`
  font-size: ${theme.font.xl};
  font-family: ${theme.weight.b};
  margin-bottom: 0em;

  ${mediaQuery.medium(css`
    font-size: ${theme.font.lg};
  `)};
`

export const H3 = styled.h3`
  font-size: ${theme.font.lg2};
  font-family: ${theme.weight.b};
  margin-bottom: 0.2rem;

  ${mediaQuery.medium(css`
    font-size: ${theme.font.lg};
  `)};
`

export const Content = styled.section`
  padding: ${theme.spacing.xl} ${theme.spacing.xxxl} ${theme.spacing.xxxl}
    ${theme.spacing.xxxl};
  width: 100%;
  background-color: ${theme.colour.greyVeryLight};
  box-sizing: border-box;

  ${mediaQuery.small(css`
    padding-left: ${theme.spacing.xl};
    padding-right: ${theme.spacing.xl};
  `)};
`

export const Bold = styled.strong`
  font-family: ${theme.weight.b};
`

export const Calendar = styled.div`
  height: 30em;
  width: 60em;
  background: ${theme.colour.grayLight};
`

export const Circle = styled.div`
  width: 0.2em;
  height: 0.2em;
  border-radius: 50px;
  font-size: 20px;
  color: #fff;
  line-height: 100px;
  text-align: center;
  background: #000;
`

export const TextLink = styled.a`
  text-decoration: underline;
  color: ${theme.colour.black};
`

export const CalHeader = styled.div`
  width: 32em;
  font-size: ${theme.font.lg};
  font-family: ${theme.weight.s};
  padding-bottom: ${theme.spacing.xl};

  ${mediaQuery.medium(css`
    width: 100%;
  `)};
`

export const CalReminder = styled.div`
  font-size: ${theme.font.lg};
  font-family: ${theme.weight.s};
  padding: ${theme.spacing.xl} 0 ${theme.spacing.lg} 0;
`

export const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;

  ${mediaQuery.xs(css`
    text-align: center;
    flex-direction: column;
  `)};
`

export const TopContainer = styled.div`
  margin-bottom: ${theme.spacing.lg};
`

export const Cancel = styled.div`
  display: inline;
  margin-left: ${theme.spacing.xxxl};

  ${mediaQuery.xs(css`
    margin-top: ${theme.spacing.md};
    margin-left: 0rem;
    display: block;
  `)};
`
