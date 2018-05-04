import React from 'react'
import PropTypes from 'prop-types'
import { injectGlobal } from 'emotion'
import { css } from 'react-emotion'
import { Trans } from 'lingui-react'
import { theme, mediaQuery, H1, Content } from './styles'
import PageHeader from './PageHeader'
import AlphaBanner from './AlphaBanner'
import FederalBanner from './FederalBanner'
import Footer from './Footer'

injectGlobal`
  html, body {
    padding: 0;
    margin: 0;
    background: ${theme.colour.white};
    height: 100%;
    font-family: ${theme.weight.l};
    font-size: 18px;
    box-sizing: border-box;

    ${mediaQuery.small(css`
      font-size: ${theme.font.md};
    `)};
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body, h1, h2, h3, h4, h5, h6, p, ol, ul, span {
    margin: 0;
    padding: 0;
    font-weight: normal;
    line-height: 1.4;
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

const Layout = ({ children, contentClass = '' }) => (
  <div>
    <AlphaBanner>
      <span>
        <Trans>This is a new service we are constantly improving.</Trans>
      </span>
    </AlphaBanner>
    <FederalBanner />
    <main role="main">
      <PageHeader>
        <H1>
          <Trans>Request a new Canadian Citizenship test date</Trans>
        </H1>
      </PageHeader>
      <Content className={contentClass}>{children}</Content>
      <Footer topBarBackground="black" />
    </main>
  </div>
)
Layout.propTypes = {
  children: PropTypes.any.isRequired,
  contentClass: PropTypes.string,
}

export default Layout
