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
    const { helmet, assets, data, path, gitHashString } = this.props

    // get attributes from React Helmet
    let htmlAttrs = helmet.htmlAttributes.toComponent()
    const bodyAttrs = helmet.bodyAttributes.toComponent()

    htmlAttrs = {
      ...htmlAttrs,
      ...{
        className:
          process.env.NODE_ENV === 'development'
            ? 'development'
            : process.env.RAZZLE_STAGE || 'dev',
      },
    }

    return (
      <html {...htmlAttrs}>
        <head>
          <link
            rel="preload"
            href="/fonts/SourceSansPro-Regular.woff"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/SourceSansPro-Bold.woff"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
          <link href="/fonts/fonts.css" rel="stylesheet" />
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
          {/* dangerouslySetInnerHTML is used here to avoid the markup being escaped by After.js */}
          {process.env.NODE_ENV === 'production' && process.env.RAZZLE_STAGE && (
            <script
              dangerouslySetInnerHTML={{
                __html: `window.SENTRY_SDK = {
                    url: 'https://cdn.ravenjs.com/3.26.4/raven.min.js',
                    dsn: 'https://a2315885b9c3429a918336c1324afa4a@sentry.io/1241616',
                    options: {
                      release: '${`${
                        process.env.RAZZLE_STAGE
                      }-${gitHashString}`}'
                    }
                  }
                  ;(function(a,b,g,e,h){var k=a.SENTRY_SDK,f=function(a){f.data.push(a)};f.data=[];var l=a[e];a[e]=function(c,b,e,d,h){f({e:[].slice.call(arguments)});l&&l.apply(a,arguments)};var m=a[h];a[h]=function(c){f({p:c.reason});m&&m.apply(a,arguments)};var n=b.getElementsByTagName(g)[0];b=b.createElement(g);b.src=k.url;b.crossorigin="anonymous";b.addEventListener("load",function(){try{a[e]=l;a[h]=m;var c=f.data,b=a.Raven;b.config(k.dsn,k.options).install();var g=a[e];if(c.length)for(var d=0;d<c.length;d++)c[d].e?g.apply(b.TraceKit,c[d].e):c[d].p&&b.captureException(c[d].p)}catch(p){console.log(p)}});n.parentNode.insertBefore(b,n)})(window,document,"script","onerror","onunhandledrejection");
                  `,
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
