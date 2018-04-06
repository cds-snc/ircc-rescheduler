import styled, { css } from 'react-emotion'

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
    xxs: '0.2em',
    xs: '0.5em',
    sm: '0.75em',
    base: '1em',
    md: '1em',
    lg: '1.5em',
    lg2: '2em',
    xl: '3em',
  },
  spacing: {
    md: '1em',
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
  font-size: ${theme.font.lg2};
  font-family: ${theme.weight.b};
`

export const H2 = styled.h2`
  font-size: ${theme.font.lg};
  font-family: ${theme.weight.b};
`

export const H3 = styled.h3`
  font-size: ${theme.font.md};
  font-family: ${theme.weight.b};
`

export const Content = styled.section`
  padding: 0 0 ${theme.spacing.xxxl} ${theme.spacing.xxxl};
  width: 65%;
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
