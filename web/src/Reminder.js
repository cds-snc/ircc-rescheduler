import styled, { css } from 'react-emotion'
import { theme, mediaQuery } from './styles'

export const Reminder = styled.section`
  font-size: ${theme.font.lg};
  font-family: ${theme.weight.s};
  margin-bottom: ${theme.spacing.xl};
  width: 80%;

  ${mediaQuery.medium(css`
    width: 100%;
  `)};
`
