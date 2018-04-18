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

  @font-face {
    font-family: 'hk_groteskbold';
    src: url('/fonts/hkgrotesk-bold-webfont.woff2') format('woff2'),
      url('/fonts/hkgrotesk-bold-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'hk_groteskbold_italic';
    src: url('/fonts/hkgrotesk-bolditalic-webfont.woff2') format('woff2'),
      url('/fonts/hkgrotesk-bolditalic-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'hk_groteskitalic';
    src: url('/fonts/hkgrotesk-italic-webfont.woff2') format('woff2'),
      url('/fonts/hkgrotesk-italic-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'hk_grotesklight';
    src: url('/fonts/hkgrotesk-light-webfont.woff2') format('woff2'),
      url('/fonts/hkgrotesk-light-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'hk_grotesklight_italic';
    src: url('/fonts/hkgrotesk-lightitalic-webfont.woff2') format('woff2'),
      url('/fonts/hkgrotesk-lightitalic-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'hk_groteskmedium';
    src: url('/fonts/hkgrotesk-medium-webfont.woff2') format('woff2'),
      url('/fonts/hkgrotesk-medium-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'hk_groteskmedium_italic';
    src: url('/fonts/hkgrotesk-mediumitalic-webfont.woff2') format('woff2'),
      url('/fonts/hkgrotesk-mediumitalic-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'hk_groteskregular';
    src: url('/fonts/hkgrotesk-regular-webfont.woff2') format('woff2'),
      url('/fonts/hkgrotesk-regular-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'hk_grotesksemibold';
    src: url('/fonts/hkgrotesk-semibold-webfont.woff2') format('woff2'),
      url('/fonts/hkgrotesk-semibold-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'hk_grotesksemibold_italic';
    src: url('/fonts/hkgrotesk-semibolditalic-webfont.woff2') format('woff2'),
      url('/fonts/hkgrotesk-semibolditalic-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
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
    l: 'hk_grotesklight, sans serif',
    li: 'hk_grotesklight_italic, sans serif',
    m: 'hk_groteskmedium, sans serif',
    mi: 'hk_groteskmedium_italic, sans serif',
    r: 'hk_groteskregular, sans serif',
    s: 'hk_grotesksemibold, sans serif',
    b: 'hk_groteskbold, sans serif',
    bi: 'hk_grotesksemibold_italic, sans serif',
  },
  font: {
    xxs: '0.2em',
    xs: '0.5em',
    sm: '0.9em',
    base: '1em',
    md: '1em',
    lg: '1.2em',
    lg2: '2em',
    xl: '3em',
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
  font-size: ${theme.font.lg2};
  font-family: ${theme.weight.b};
`

export const H2 = styled.h2`
  font-size: ${theme.font.lg};
  font-family: ${theme.weight.b};
  margin-bottom: 0em;
`

export const H3 = styled.h3`
  font-size: ${theme.font.md};
  font-family: ${theme.weight.b};
`

export const Content = styled.section`
  padding: ${theme.spacing.xl} ${theme.spacing.xxxl} ${theme.spacing.xxxl}
    ${theme.spacing.xxxl};
  width: 100%;
  background-color: ${theme.colour.greyVeryLight};
  box-sizing: border-box;
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

  ${mediaQuery.small(css`
    width: 100%;
  `)};
`

export const CalReminder = styled.div`
  font-size: ${theme.font.lg};
  font-family: ${theme.weight.s};
  padding: ${theme.spacing.xl} 0 ${theme.spacing.lg} 0;
`

export const Cancel = styled.p`
  display: inline;

  ${mediaQuery.xs(css`
    margin-top: ${theme.spacing.md};
    display: block;
  `)};
`
