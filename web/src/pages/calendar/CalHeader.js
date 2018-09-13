import React from 'react'
import PropTypes from 'prop-types'
import { i18n } from '@lingui/core'
import { NavLink } from 'react-router-dom'
import Title from '../../components/Title'
import FocusedH1 from '../../components/FocusedH1'
import CalendarH1 from '../../components/CalendarH1'
import Chevron from '../../components/Chevron'
import { TopContainer, theme, H2 } from '../../styles'
import { Trans } from '@lingui/react'
import { windowExists } from '../../utils/windowExists'
import styled, { css } from 'react-emotion'

const headerStyles = css`
  font-weight: 400;
  margin-bottom: ${theme.spacing.xl};
  margin-top: 0;

  strong {
    font-weight: 700;
  }
`

const calH1 = css`
  font-size: ${theme.font.xl};
`

const CalendarSubheader = styled(H2)`
  font-size: ${theme.font.lg};
  ${headerStyles};
`
export const CalHeader = ({
  locale = 'en',
  path,
  headerMonth = '',
  headerNote = [],
  familyOption,
}) => {
  return (
    <div>
      <Title path={path} i18n={i18n} />
      <TopContainer>
        <nav>
          <NavLink className="chevron-link" to="/register">
            <Chevron dir="left" />
            <Trans>Go back</Trans>
          </NavLink>
        </nav>
      </TopContainer>

      <FocusedH1 id="calendar-header" className={calH1}>
        <CalendarH1 familyOption={familyOption} locale={locale} />
      </FocusedH1>

      {windowExists() && (
        <CalendarSubheader id="calendar-intro">
          <Trans>Citizenship appointments in</Trans> {headerMonth}{' '}
          <Trans>are scheduled on </Trans>
          {headerNote}.
        </CalendarSubheader>
      )}
    </div>
  )
}

CalHeader.propTypes = {
  locale: PropTypes.string,
  path: PropTypes.string.isRequired,
  headerMonth: PropTypes.string,
  headerNote: PropTypes.array,
  familyOption: PropTypes.string,
}

CalHeader.propTypes = {
  locale: PropTypes.string,
  path: PropTypes.string.isRequired,
  headerMonth: PropTypes.string,
  headerNote: PropTypes.array,
  familyOption: PropTypes.string,
}
