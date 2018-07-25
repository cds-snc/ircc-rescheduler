import React from 'react'
import styled, { css } from 'react-emotion'
import { NavLink } from 'react-router-dom'
import { H1, H2, theme, mediaQuery, arrow } from '../styles'
import Layout from '../components/Layout'
import Title, { matchPropTypes } from '../components/Title'
import { LongReminder } from '../components/Reminder'
import { buttonStyles } from '../components/forms/Button'
import { Trans } from 'lingui-react'
import rightArrow from '../assets/rightArrow.svg'
import { getStartMonthName, getEndMonthName } from '../utils/calendarDates'
import withContext from '../withContext'
import { contextPropTypes } from '../context'

const contentClass = css`
  p {
    margin-bottom: ${theme.spacing.xl};

    ${mediaQuery.md(css`
      margin-bottom: ${theme.spacing.lg};
    `)};
  }
`

const CalendarIcon = styled.div`
  width: 3.45rem;
  height: 3.25rem;

  ${mediaQuery.md(css`
    width: 3.1rem;
    height: 3rem;
  `)};

  background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIyLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxMjUgMTE1LjgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEyNSAxMTUuODsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8dGl0bGU+YWVydHlBc3NldCAzPC90aXRsZT4KPGltYWdlIHN0eWxlPSJvdmVyZmxvdzp2aXNpYmxlOyIgd2lkdGg9IjE1MSIgaGVpZ2h0PSIxMzciIHhsaW5rOmhyZWY9ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBSmNBQUFDSkNBSUFBQUN1SVQzRkFBQUFDWEJJV1hNQUFBc1NBQUFMRWdIUzNYNzhBQUFDCjJVbEVRVlI0bk8zYzdXMmpRQmdBWWZ1VUFpamhTcUFFWEpJN29BTzNrRTZnaEMzQkpkQUJKMW1uSk1vaXZLd1hiQS96L015SDQyWEUKQnBsWEhNZHhQT2pOL1RFZ2dCVUpyRWhnUllLUHg5ZHdQQjVudnV2VjB3Ykh4M09Sd0lvRVZpU3dJb0VWQ2F4SVlFVUNLeEpZa2NDSwpCRllrbUxoTFBQKzVuNTVyOG5OWHowVUNLeEpZa1NELy91TFhCcDE0LzJ4di8yNjNQRDZlaXdSV0pMQWlnUlVKQ2t4UE9SODFiNFBqCjQ3bElZRVdDL0IzVmoxdm5iWGw4UEJjSnJFaGdSUUlyRWxpUndJb0VWaVN3SW9FVkNheElZRVVDS3hKWWtjQ0tCRllrc0NKQjBsM2kKeStWUzEvWGVEOVhtUWdqbjh6bmxyeVpWck91NmFacTNPZ0w3NG81S1lFVUNLeEprenNCZGI1YitWbDNYVlZYOS9Fb0lZUmlHcGE4VAovNVB1KzM3cGkxUlY5ZXVTTFc5UmYyOStmcVhVb2hZWUkvSHZkbDMzNjRmYXRzMzRXL0hyNUwzMWxQZDhWOU0wUlJiVnR1MUtpK3E2Ckx1WEh4bkYwUnlXd0lzR2pGZU45cWNoMmx5M2V0RE8yelpSRnBXeWI4V2E3MHNIeFhDU3dJb0VWQ2F4SVlFVUNLeEpZa2NDS0JGWWsKc0NLQkZRa2VmV3JSTUF3WjkvYldFMEtZZisyVU80Z3BpMHE1ZzNpOVhyYzVPSTlXRENHY1RxZENiNmFBeEtHeGVhVVc5WG16NW5MLwpjMGNsc0NKQjBqUDh1NjV6SG5WN2ZkL0hHN3ZQOE1leUlvRVZDWnhIL2VZOGFoTG5VV2ZFaTNJZWRWK3NTUEFxODZoM1J6Y250NWVWCk9JK3FKN0FpZ1JVSnJFaGdSUUlyRWxpUndJb0VWaVN3SW9FVkNWNWxIdlh1Nk9iZFFkT0NuRWZOdE5ub1pncm5VZlVFVmlSd0h2VjEKT1krNkwxWWtzQ0tCODZqZm5FZE40anpxakhoUnpxUHVpeFVKYVBPb1JaNlBXb3J6cUZyQWlnUldKTEFpZ1JVSnJFaGdSUUlyRWxpUgp3SW9FVmlTZ3phTVdlVDVxS2M2alppcnlmTlJTbkVmVkFsWWtjQjcxZFRtUHVpOVdKTEFpZ1JVSmtxNXU0bWxnYldBWWh2aERqTW1yCm02U0tlaDFlbzJKWmtjQ0tCRllrbUxpbnNlVU12SXFZdUViVjIzRkhKYkFpZ1JVSnJFaGd4YmQzT0J6K0FiRlVjOUtFNytxMEFBQUEKQUVsRlRrU3VRbUNDIiB0cmFuc2Zvcm09Im1hdHJpeCgwLjgyMTIgMCAwIDAuODIxMiAxIDIpIj4KPC9pbWFnZT4KPC9zdmc+Cg==');
`

const messageContainer = css`
  display: flex;
  align-items: center;

  p {
    margin-bottom: 0;
  }
`

const iconContainer = css`
  width: 3.45rem;
  height: 3.35rem;

  margin-right: ${theme.spacing.md};

  ${mediaQuery.md(css`
    width: 3.1rem;
    height: 3rem;
  `)};
`

const list = css`
  list-style: disc;
  margin-left: ${theme.spacing.lg};
  margin-top: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.lg};

  li {
    margin-bottom: ${theme.spacing.sm};

    p {
      margin-bottom: 0;
    }
  }
`

const H1Landing = styled(H1)`
  font-size: ${theme.font.xl};
  font-family: ${theme.weight.b}, Helvetica;
  line-height: 1;
`

const H2Landing = styled(H2)`
  font-family: ${theme.weight.r}, Helvetica;
  font-weight: 400;
`

class LandingPage extends React.Component {
  render() {
    let locale = 'en'

    if (
      this.props &&
      this.props.context &&
      this.props.context.store &&
      this.props.context.store.language
    ) {
      locale = this.props.context.store.language
    }
    return (
      <Layout contentClass={contentClass}>
        <Title path={this.props.match.path} />
        <section>
          <H1Landing>
            <Trans>
              Tell IRCC you can&rsquo;t attend your citizenship appointment, and
              request a new one.
            </Trans>
          </H1Landing>

          <H2Landing>
            <Trans>You will need:</Trans>
          </H2Landing>
          <ul className={list}>
            <li>
              <p>
                <Trans>Your paper file number</Trans>
              </p>
            </li>

            <li>
              <p>
                <Trans>To describe your reason for rescheduling</Trans>
              </p>
            </li>
          </ul>
          <div className={messageContainer}>
            <div className={iconContainer}>
              <CalendarIcon />
            </div>
            <p>
              <Trans>Then you’ll select</Trans>{' '}
              <strong>
                <Trans>3 days</Trans>
              </strong>{' '}
              <Trans>you’re available between </Trans>{' '}
              {getStartMonthName(new Date(), locale)} <Trans>and</Trans>{' '}
              {getEndMonthName(new Date(), locale)}.
            </p>
          </div>
        </section>

        <LongReminder>
          <Trans>
            Requesting a new appointment will cancel your current one. Do not
            attend your old appointment after you complete this request.
          </Trans>
        </LongReminder>

        <div>
          <NavLink to="/register" className={buttonStyles}>
            <Trans>Start now</Trans>{' '}
            <img src={rightArrow} className={arrow} alt="" />
          </NavLink>
        </div>
      </Layout>
    )
  }
}

LandingPage.propTypes = {
  ...contextPropTypes,
  ...matchPropTypes,
}

export default withContext(LandingPage)
