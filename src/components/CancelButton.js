import React from 'react'
import { css } from 'emotion'
import { Trans } from '@lingui/react'
import { theme } from '../styles'

const cancelStyles = css`
  background-color: transparent;
  border: none;
  font-size: ${theme.font.base};
  color: ${theme.colour.blue};
  text-decoration: underline;

  &:hover {
    cursor: pointer;
  }
`

const CancelButton = () => {
  return (
    <div>
      <a href="/clear" className={cancelStyles}>
        <Trans>Cancel request</Trans>
      </a>
    </div>
  )
}

export default CancelButton
