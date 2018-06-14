import React from 'react'
import PropTypes from 'prop-types'
import { injectGlobal } from 'emotion'
import { css } from 'react-emotion'
import { Trans } from 'lingui-react'
import { theme, mediaQuery, Content } from '../styles'
import AlphaBanner from './AlphaBanner'
import PageHeader from './PageHeader'
import FederalBanner from './FederalBanner'
import Footer from './Footer'
import { ErrorBoundary } from '@cdssnc/gcui'
import ErrorPage from '../pages/ErrorPage'
import { initGA, logPageView } from '../utils/analytics'

injectGlobal`
  html, body {
    padding: 0;
    margin: 0;
    background: ${theme.colour.white};
    height: 100%;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 18px;
    box-sizing: border-box;

    ${mediaQuery.sm(css`
      font-size: ${theme.font.md};
    `)};
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body, h1, h2, h3, h4, h5, h6, p, ol, ul, span {
    margin: 0;
    padding: 0;
    line-height: 1.4;
  }

  a:focus {
    outline-offset: 2px;
    outline: 3px solid #ffbf47;
  }

  ol, ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  #paperFileNumber-details, #fullName-details {
   margin-top: 0rem;
  }
`

class Layout extends React.Component {
  componentDidMount() {
    if (process.env.NODE_ENV === 'production' && process.env.RAZZLE_GA_ID) {
      if (!window.GA_INITIALIZED) {
        initGA(process.env.RAZZLE_GA_ID)
        window.GA_INITIALIZED = true
      }
      logPageView()
    }
  }

  render() {
    return (
      <div>
        <ErrorBoundary
          onError={(error, errorInfo) => {
            window.Raven.captureException(error, {
              extra: errorInfo,
            })
          }}
          render={() => <ErrorPage />}
        >
          <div role="banner">
            <AlphaBanner alpha>
              <Trans>This is a new service we are constantly improving.</Trans>
            </AlphaBanner>
            <FederalBanner />
            <PageHeader headerClass={this.props.headerClass}>
              <Trans>Request a new Canadian Citizenship appointment</Trans>
            </PageHeader>
          </div>
          <main role="main">
            <Content className={this.props.contentClass || ''}>
              {this.props.children}
            </Content>
          </main>
          <Footer topBarBackground="black" />
        </ErrorBoundary>
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.any.isRequired,
  contentClass: PropTypes.string,
  headerClass: PropTypes.string,
}

export default Layout
