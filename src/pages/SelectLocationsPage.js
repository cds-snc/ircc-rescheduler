/* eslint-disable no-undef */
import React from 'react'
// import styled from '@emotion/styled'
import { css } from 'emotion'
import { withRouter } from 'react-router-dom'
//import { H1, theme, mediaQuery , arrow } from '../styles'
import { H1, theme, mediaQuery } from '../styles'
import Layout from '../components/Layout'
import SelectProvince from '../components/SelectProvince'
import Title, { matchPropTypes } from '../components/Title'
//import { buttonStyles } from '../components/forms/Button'
import { Trans } from '@lingui/react'
//import rightArrow from '../assets/rightArrow.svg'


/* eslint-disable no-console */

const contentClass = css`
  p {
    margin-bottom: ${theme.spacing.xl};

    ${mediaQuery.md(css`
      margin-bottom: ${theme.spacing.lg};
    `)};
  }
`

const messageContainer = css`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
  p {
    margin-bottom: 0;
  }
`

//const landingArrow = css`
//  ${arrow};
//  margin-left: 4px;
//`

class SelectlocationsPage extends React.Component {

  render() {
    return (
      <Layout
        contentClass={contentClass}
        header={
          <H1>
            <Trans>Start by selecting a province</Trans>
          </H1>
        }
      >
        <Title path={this.props.match.path} />
        <div className={messageContainer}>
          <section>
            <div>
              <SelectProvince />
            </div>
          </section>
        </div>
      </Layout>          
    )
  }
}

SelectlocationsPage.propTypes = {
 ...matchPropTypes,
}

export default withRouter(SelectlocationsPage)
