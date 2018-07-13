import React from 'react'
import { H1, visuallyhidden, theme } from '../styles'
import { css } from 'react-emotion'
import { Trans } from 'lingui-react'
import Layout from '../components/Layout'
import withContext from '../withContext'
import { contextPropTypes } from '../context'

const contentClass = css`
  p {
    margin-top: ${theme.spacing.xs};
  }

  section {
    margin-bottom: 0;
  }
`

class SomethingWrongPage extends React.Component {
  render() {
    return (
      <Layout contentClass={contentClass} headerClass={visuallyhidden}>
        <section>
          <H1>
            <Trans>Failed.</Trans>
          </H1>
        </section>
      </Layout>
    )
  }
}

SomethingWrongPage.propTypes = {
  ...contextPropTypes,
}

export default withContext(SomethingWrongPage)
