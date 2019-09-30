import React from 'react'
import PropTypes from 'prop-types'
import { i18n } from '@lingui/core'
import Title from '../../components/Title'
import FocusedH1 from '../../components/FocusedH1'
import CalendarH1 from '../../components/CalendarH1'
import { dateToHTMLString } from '../../components/Time'
import { getStartDate } from '../../utils/calendarDates'
import { theme, H2, visuallyhidden } from '../../styles'
import { Trans } from '@lingui/react'
import { windowExists } from '../../utils/windowExists'
import styled from '@emotion/styled'
import { css } from 'emotion'

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

const FirstDayString = ({ locale }) => (
  <p className={visuallyhidden} id="firstDayString">
    <Trans>The first available day is</Trans>{' '}
    {dateToHTMLString(getStartDate(), locale)}
  </p>
)
FirstDayString.propTypes = {
  locale: PropTypes.string.isRequired,
}

export const CalHeader = ({
  locale = 'en',
  path,
  headerMonth = '',
  headerNote = [],
  familyOption = [],
}) => {
  return (
    <div>
      <Title path={path} i18n={i18n} />
      {/* <TopContainer>
        <nav>
          <NavLink className="chevron-link" to="/selectProvince">
            <Chevron dir="left" />
            <Trans>Go back</Trans>
          </NavLink>
        </nav>
      </TopContainer> */}

      <FocusedH1 id="calendar-header" className={calH1}>
        <CalendarH1 familyOption={familyOption} locale={locale} />
      </FocusedH1>

      {windowExists() && (
        <CalendarSubheader id="calendar-intro">
          <Trans>Biometric appointments in</Trans> {headerMonth}{' '}
          <Trans>are scheduled on </Trans>
          {headerNote}.
        </CalendarSubheader>
      )}

      <FirstDayString locale={locale} />
    </div>
  )
}

CalHeader.propTypes = {
  locale: PropTypes.string,
  path: PropTypes.string.isRequired,
  headerMonth: PropTypes.string,
  headerNote: PropTypes.array,
  familyOption: PropTypes.array,
}
