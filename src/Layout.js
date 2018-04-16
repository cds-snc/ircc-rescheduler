import React from 'react'
import { Trans } from 'lingui-react'
import { H1, Content } from './styles'
import PageHeader from './PageHeader'
import AlphaBanner from './AlphaBanner'
import FederalBanner from './FederalBanner'
import Footer from './Footer'

const Layout = ({ children, mainClass = '' }) => (
  <div>
    <AlphaBanner>
      <span>
        <Trans>This is a new service we are constantly improving.</Trans>
      </span>
    </AlphaBanner>
    <FederalBanner />
    <main role="main" className={mainClass}>
      <PageHeader>
        <H1>
          <Trans>Request a new Canadian Citizenship test date</Trans>
        </H1>
      </PageHeader>
      <Content>{children}</Content>
      <Footer topBarBackground="black" />
    </main>
  </div>
)

export default Layout
