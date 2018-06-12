import styled, { css } from 'react-emotion'
import { theme, mediaQuery } from '../styles'
import { PhaseBanner } from '@cdssnc/gcui'

let AlphaBanner = styled(PhaseBanner)`
  padding-top: ${theme.spacing.sm};
  padding-bottom: ${theme.spacing.sm};
  display: flex;

  span:last-of-type {
    margin-left: 0;
    ${mediaQuery.sm(css`
      padding: 0;
      line-height: 1.3;
    `)};
  }

  span:first-of-type {
    padding: 0 ${theme.spacing.md} 0 ${theme.spacing.md};
    ${mediaQuery.sm(css`
      padding: 0.1rem ${theme.spacing.md} 0.1rem ${theme.spacing.md};
    `)};
  }

  ${mediaQuery.sm(css`
    padding: ${theme.spacing.md} 0 ${theme.spacing.md} ${theme.spacing.xl};
    display: flex;
  `)};
`

export default AlphaBanner
