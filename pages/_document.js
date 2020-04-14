import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

const bodyStyles = {
  margin: 0,
  fontFamily: 'Karmilla, sans-serif',
  letterSpacing: '-0.007em'
}

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="de">
        <Head>
          {/* Google Analytics 
          Adaptation of the offical example but with analytics.js
          https://github.com/zeit/next.js/blob/canary/examples/with-google-analytics/

          Consider adding this when stable
          https://www.npmjs.com/package/@next/plugin-google-analytics
          */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
              //if (process.browser) {
                var disableStr = "ga-disable-UA-20283862-5";
                if (document.cookie.indexOf(disableStr + "=true") > -1) {
                  window[disableStr] = true;
                }
                else {
                  (function (i, s, o, g, r, a, m) {
                    i["GoogleAnalyticsObject"] = r;
                    (i[r] =
                      i[r] ||
                      function () {
                        (i[r].q = i[r].q || []).push(arguments);
                      }),
                      (i[r].l = 1 * new Date());
                    (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
                    a.async = 1;
                    a.src = g;
                    m.parentNode.insertBefore(a, m);
                  })(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");
                  ga("create", "UA-20283862-5", "serlo.org");
                  ga("require", "displayfeatures");
                  ga("require", "linkid", "linkid.js");
                  ga("set", "anonymizeIp", true);
                  ga('set', 'dimension1', 'redesign');
                  // console.log("sending");
                  // ga("send", "pageview");
                  var visitTookTime = false;
                  var didScroll = false;
                  var bounceSent = false;
                  var scrollCount = 0;
                  function testScroll() {
                    ++scrollCount;
                    if (scrollCount == 2) {
                      didScroll = true;
                    }
                    sendNoBounce();
                  }
                  function timeElapsed() {
                    visitTookTime = true;
                    sendNoBounce();
                  }
                  function sendNoBounce() {
                    if (didScroll && visitTookTime && !bounceSent) {
                      bounceSent = true;
                      ga(
                        "send",
                        "event",
                        "no bounce",
                        "resist",
                        "User scrolled and spent 30 seconds on page."
                      );
                    }
                  }
                  setTimeout("timeElapsed()", 3e4);
                  window.addEventListener
                    ? window.addEventListener("scroll", testScroll, false)
                    : window.attachEvent("onScroll", testScroll);
                }
                function gaOptout() {
                  document.cookie =
                    disableStr + "=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/";
                  window[disableStr] = true;
                }
                
              //}
              `
            }}
          />
        </Head>
        <body style={bodyStyles}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
