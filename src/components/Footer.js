import React from 'react'
import PropTypes from 'prop-types'
import { Trans, withI18n } from '@lingui/react'
import CanadaWordmark from '../assets/CanadaWordmark.svg'
import styled from '@emotion/styled'
import { css } from 'emotion'
import { theme, mediaQuery, visuallyhiddenMobile } from '../styles'
import { getEmail } from '../locations'
import Language from './Language'
import { NavLink } from 'react-router-dom'

const footer = css`
  background-color: ${theme.colour.white};
  padding: ${theme.spacing.xl} ${theme.spacing.xxxl};
  display: flex;
  justify-content: space-between;
  position: relative;
  font-size: ${theme.font.md};

  .svg-container {
    width: 150px;
    height: 40px;
    padding-top: ${theme.spacing.xs};
    margin-bottom: ${theme.spacing.sm};

    ${mediaQuery.md(css`
      width: 100px;
      height: 25px;
      padding-top: 0;
      margin-bottom: 0;
    `)};

    ${mediaQuery.sm(css`
      width: 80px;
      height: 18px;
      padding-top: ${theme.spacing.xs};
      margin-bottom: ${theme.spacing.xs};
    `)};

    ${mediaQuery.xs(css`
      width: 70px;
      height: 15px;
      padding-top: ${theme.spacing.xs};
      margin-bottom: ${theme.spacing.xs};
    `)};
  }

  ${mediaQuery.md(css`
    align-items: center;
    padding: ${theme.spacing.xl} ${theme.spacing.xxxl} ${theme.spacing.xl}
      ${theme.spacing.xxxl};
  `)};

  ${mediaQuery.sm(css`
    padding: ${theme.spacing.md} ${theme.spacing.xl} ${theme.spacing.lg}
      ${theme.spacing.xl};
  `)};
`

const bottomLinks = css`
  margin-top: ${theme.spacing.md};
  font-size: ${theme.font.md};
  display: inline-block;

  > * {
    margin-right: ${theme.spacing.xl};

    ${mediaQuery.md(css`
      margin-right: ${theme.spacing.md};
    `)};

    ${mediaQuery.sm(css`
      margin-bottom: ${theme.spacing.xs};
    `)};
  }

  a {
    color: ${theme.colour.black};
  }

  a:nth-of-type(2) {
    color: ${theme.colour.black};
  }

  ${mediaQuery.md(css`
    display: flex;
    margin-top: ${theme.spacing.sm};
    font-size: ${theme.font.sm};
  `)};

  ${mediaQuery.sm(css`
    margin-top: ${theme.spacing.md};
  `)};
`

const TopBar = styled.hr(
  {
    height: '0.4em',
    border: 'none',
    margin: 0,
  },
  props => ({ background: props.background }),
)

const Footer = ({ contact = true, topBarBackground, i18n }) => (
  <div>
    {topBarBackground ? <TopBar background={topBarBackground} /> : ''}
    <footer id="footer" className={footer}>
      <div className={bottomLinks}>
        {contact && (
          <a href={`mailto:${getEmail()}`}>
            <Trans>Contact</Trans>
          </a>
        )}

        <NavLink to="/privacy">
          <Trans>Privacy</Trans>
        </NavLink>

        <a href={i18n._('https://digital.canada.ca/legal/terms/')}>
          <Trans>Terms</Trans>
          <Language
            render={language =>
              language === 'fr' ? null : (
                <span className={visuallyhiddenMobile}> and Conditions</span>
              )
            }
          />
        </a>
      </div>

      <div className="svg-container">
        <Language
          render={language => (
            <img
              src={CanadaWordmark}
              alt={
                language === 'en'
                  ? 'Symbol of the Government of Canada'
                  : 'Symbole du gouvernement du Canada'
              }
            />
          )}
        />
      </div>
    </footer>
  </div>
)

Footer.propTypes = {
  topBarBackground: PropTypes.string,
  i18n: PropTypes.object,
  contact: PropTypes.bool,
}

const FooterI18n = withI18n()(Footer)

export { FooterI18n as default, Footer as FooterBase }
