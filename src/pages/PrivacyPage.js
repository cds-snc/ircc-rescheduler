import React from 'react'
import { css } from 'react-emotion'
import { theme } from '../styles'
import Layout from '../components/Layout'
import Title, { matchPropTypes } from '../components/Title'
import Language from '../components/Language'
import snarkdown from 'snarkdown'
import { privacy } from './privacy/PRIVACY_en'
import { privacyFR } from './privacy/PRIVACY_fr'

const contentClass = css`
  p {
    padding-bottom: ${theme.spacing.lg};
  }

  ul {
    list-style: disc;
    margin-left: ${theme.spacing.lg};
    margin-top: ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.lg};
  }

  li {
    margin-bottom: ${theme.spacing.sm};
  }

  br {
    content: ' ';
    display: block;
    margin: ${theme.spacing.lg};
  }
`

const getMarkup = locale => {
  return { __html: snarkdown(locale === 'en' ? privacy : privacyFR) }
}

const PrivacyPage = props => (
  <Layout contentClass={contentClass} contact={false}>
    <Title path={props.match.path} />
    <Language
      render={locale => <section dangerouslySetInnerHTML={getMarkup(locale)} />}
    />
  </Layout>
)

PrivacyPage.propTypes = {
  ...matchPropTypes,
}

export default PrivacyPage
