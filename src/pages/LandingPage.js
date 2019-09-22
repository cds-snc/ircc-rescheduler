import React from 'react'
import styled from '@emotion/styled'
import { css } from 'emotion'
import { NavLink } from 'react-router-dom'
import { H1, theme, mediaQuery, arrow } from '../styles'
import Layout from '../components/Layout'
import Title, { matchPropTypes } from '../components/Title'
// import { LongReminder } from '../components/Reminder'
import { buttonStyles } from '../components/forms/Button'
import { Trans } from '@lingui/react'
import rightArrow from '../assets/rightArrow.svg'
// import { getStartMonthName, getEndMonthName } from '../utils/calendarDates'
// import Language from '../components/Language'

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
  margin-bottom: ${theme.spacing.lg};
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

// const H2Landing = styled(H2)`
//   font-size: ${theme.font.xl};
//   margin-top: 0 !important;
// `

// const H2List = styled(H2)`
//   font-weight: 400;
// `

const landingArrow = css`
  ${arrow};
  margin-left: 4px;
`

class LandingPage extends React.Component {
  render() {
    return (
      <Layout contentClass={contentClass}>
        <Title path={this.props.match.path} />
        <section>
          <H1 id='needed-info' style={{ marginBottom: `${theme.spacing.md}` }}>
            <Trans>You will need</Trans>
          </H1>
          <ul className={list}>
            <li>
              <p>
                <Trans>Your</Trans>{' '}
                <b>
                  <Trans>Application number</Trans>{' '}
                </b>
                <Trans>
                  which can be found at the top of the mailed letter we sent you
                </Trans>
              </p>
            </li>

            <li>
              <p>
                <Trans>A</Trans>{' '}
                <b>
                  <Trans>valid email address</Trans>
                </b>{' '}
                <Trans>where we can send a confirmation message</Trans>
              </p>
            </li>
          </ul>

          <div id='message-container' className={messageContainer}>
            <div id='icon-container' className={iconContainer}>
              <CalendarIcon />
            </div>
            <p>
              <Trans>Next, you</Trans>&#39;ll{' '}
              <Trans>select a location, day and time you</Trans> &#39;
              <Trans>re available within the next 30 days.</Trans>{' '}
            </p>
          </div>
          <H1 id='privacy-notice' >
            <Trans>Privacy notice</Trans>
          </H1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            euismod bibendum laoreet. Proin gravida dolor sit amet lacus
            accumsan et viverra justo commodo. Proin sodales pulvinar sic
            tempor. Sociis natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra
            vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc.
          </p>
        </section>

        <div>
          <NavLink to="/register" className={buttonStyles}>
            <Trans>Start request</Trans>
            <img src={rightArrow} className={landingArrow} alt="" />
          </NavLink>
        </div>
      </Layout>
    )
  }
}

LandingPage.propTypes = {
  ...matchPropTypes,
}

export default LandingPage
