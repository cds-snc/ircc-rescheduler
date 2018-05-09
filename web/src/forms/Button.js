import styled, { css } from 'react-emotion'
import { theme, roundedEdges, mediaQuery, incrementColor } from '../styles'

const Button = styled.button`
  font-size: ${theme.font.lg};
  font-weight: 500;
  color: ${theme.colour.white};
  background-color: ${theme.colour.gray};
  border: 5px solid transparent;
  outline: 0;
  padding: ${theme.spacing.xs} ${theme.spacing.lg};
  cursor: pointer;
  ${roundedEdges};

  ${mediaQuery.small(css`
    width: 100%;
    padding: ${theme.spacing.sm} ${theme.spacing.lg};
  `)};

  &:focus {
    outline: 4px solid ${theme.colour.focus};
    outline-offset: -1px;
  }

  &:hover,
  &:active,
  &:focus {
    background-color: ${incrementColor(theme.colour.gray, 20)};
  }

  &:active,
  &:disabled {
    filter: alpha(opacity=60);
    opacity: 0.6;
  }

  &:disabled {
    &:hover {
      cursor: not-allowed;
      background-color: ${incrementColor(theme.colour.gray, 30)};
    }
  }
`

export default Button
