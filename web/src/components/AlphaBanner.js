import styled, { css } from 'react-emotion'
import { theme, mediaQuery } from '../styles'
import { PhaseBanner } from '@cdssnc/gcui'

let AlphaBanner = styled(PhaseBanner)`
  padding-top: ${theme.spacing.sm};
  padding-bottom: ${theme.spacing.sm};

  ${mediaQuery.sm(css`
    padding-left: ${theme.spacing.xl};
    padding-bottom: ${theme.spacing.sm};
  `)};
`

export default AlphaBanner
