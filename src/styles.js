import { css } from 'react-emotion'

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
    l: 'HKGroteskLight',
    li: 'HKGroteskLightItalic',
    m: 'HKGroteskMedium',
    mi: 'HKGroteskMediumItalic',
    r: 'HKGroteskRegular',
    s: 'HKGroteskSemiBold',
    b: 'HKGroteskBold',
    bi: 'HKGroteskSemiBoldItalic',
  },
  font: {
    xs: '12px',
    sm: '16px',
    base: '20px',
    md: '20px',
    lg: '24px',
    lg2: '32px',
    xl: '48px',
  },
  spacing: {
    md: 16,
    sm: 16 / 2,
    xs: 16 / 3,
    xxs: 16 / 6,
    lg: 16 * 1.3,
    xl: 16 * 2,
    xxl: 16 * 3,
    xxxl: 16 * 5,
  },
}

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
