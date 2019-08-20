import React from 'react'
import PropTypes from 'prop-types'
import { css, injectGlobal } from 'emotion'
import { theme, mediaQuery, content } from '../styles'
import FederalBanner from './FederalBanner'
import Devider from './Devider'
import PageHeader from './PageHeader'
import Footer from './Footer'
import { ErrorBoundary } from './ErrorBoundary'
import { ErrorPageContent } from '../pages/ErrorPage'
import { initGA, logPageView } from '../utils/analytics'


injectGlobal`
  html, body {
    padding: 0;
    margin: 0;
    background: ${theme.colour.white};
    height: 100%;
    font-family: SourceSans, Helvetica, Arial, sans-serif;
    font-size: 18px;
    box-sizing: border-box;

    ${mediaQuery.sm(css`
      font-size: ${theme.font.md};
    `)};
  }

  main{
    outline: 0;
  }

  button {
    font-family: SourceSans, Helvetica, Arial, sans-serif;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body, h1, h2, h3, h4, h5, h6, p, ol, ul, span {
    margin: 0;
    padding: 0;
    line-height: 1.4;
  }

  a,
  a:visited {
    color: ${theme.colour.link};
  }

  a:focus {
    outline-offset: 2px;
    outline: 3px solid #ffbf47;
  }

  .chevron-link path {
    fill: ${theme.colour.link};
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

  hr {
   border: 0;
   height: 1px;
   background: #DBDBDB;
  }
`

class Layout extends React.Component {
  componentDidMount() {
    if (
      process.env.NODE_ENV === 'production' &&
      process.env.RAZZLE_STAGE !== 'ci' &&
      process.env.RAZZLE_GA_ID
    ) {
      if (window && !window.GA_INITIALIZED) {
        initGA(process.env.RAZZLE_GA_ID)
        window.GA_INITIALIZED = true
      }
      logPageView()
    }
  }

  render() {
    const { contentClass = '' } = this.props
    return (
      <div>
        <ErrorBoundary
          onError={(error, errorInfo) => {
            if (!window || !window.Raven) return
            window.Raven.captureException(error, {
              extra: errorInfo,
            })
          }}
          render={() => <ErrorPageContent />}
        >
          <div role="banner">
            <FederalBanner />
            <Devider />
            <PageHeader>{this.props.header}</PageHeader>
          </div>
          <main role="main">
            <div
              className={css`
                ${content} ${contentClass}
              `}
            >
              {this.props.children}
            </div>
          </main>
          <Footer topBarBackground="true" />
        </ErrorBoundary>
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.any.isRequired,
  contentClass: PropTypes.string,
  header: PropTypes.element,
  contact: PropTypes.bool,
}

export default Layout
