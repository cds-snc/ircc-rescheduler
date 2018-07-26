import React from 'react'
import { AfterRoot, AfterData } from '@jaredpalmer/after'

/*
Track views for users with no JS see:

https://developers.google.com/analytics/devguides/collection/protocol/v1/devguide#proxy-server-tracking

Required Params:
v=1              // Version.
&tid=UA-XXXXX-Y  // Tracking ID / Property ID.
&cid=555         // Anonymous Client ID.
&t=              // Hit Type.
*/

const noJSTracker = (path = '/') => {
  const uri = 'https://www.google-analytics.com/collect?v=1&cid=555'
  const ga = process.env.RAZZLE_GA_ID
  const hasParams = () => (path.indexOf('?') === -1 ? '?' : '&')
  const page = encodeURIComponent(path + hasParams() + 'nojs=true')

  return {
    __html: `
    <div style="background-image: url('${uri}&t=pageview&dp=${page}&tid=${ga}')"></div>`,
  }
}

class Document extends React.Component {
  static async getInitialProps({ assets, data, renderPage }) {
    const page = await renderPage()
    return { assets, data, ...page }
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { helmet, assets, data, path } = this.props

    // get attributes from React Helmet
    const htmlAttrs = helmet.htmlAttributes.toComponent()
    const bodyAttrs = helmet.bodyAttributes.toComponent()

    return (
      <html {...htmlAttrs}>
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          {helmet.title.toComponent()[0].key ? (
            helmet.title.toComponent()
          ) : (
            <title>Request a new citizenship appointment</title>
          )}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
        </head>
        <body {...bodyAttrs}>
          {process.env.NODE_ENV === 'production' && process.env.RAZZLE_GA_ID ? (
            <noscript dangerouslySetInnerHTML={noJSTracker(path)} />
          ) : null}
          <AfterRoot />
          <AfterData data={data} />
          {process.env.NODE_ENV === 'production' && (
            <script
              src="https://cdn.ravenjs.com/3.26.2/raven.min.js"
              crossOrigin="anonymous"
            />
          )}
          {/* dangerouslySetInnerHTML is used here to avoid the markup being escaped by After.js */}
          {process.env.NODE_ENV === 'production' && (
            <script
              dangerouslySetInnerHTML={{
                __html: `Raven.config('https://a2315885b9c3429a918336c1324afa4a@sentry.io/1241616', {release: ${
                  process.env.RAZZLE_STAGE
                }}).install()`,
              }}
            />
          )}

          <script
            type="text/javascript"
            src={assets.client.js}
            defer
            crossOrigin="anonymous"
          />
        </body>
      </html>
    )
  }
}

export default Document
