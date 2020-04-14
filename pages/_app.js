import React from 'react'
import App from 'next/app'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import '../public/fonts/karmilla.css'
import '../public/fonts/katex/katex.css'

import { ThemeProvider } from 'styled-components'
import { theme } from '../src/theme'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    console.log('render _app')
    return (
      <ThemeProvider theme={theme}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            ga("send", "pageview");
            `
          }}
        />
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}

export default MyApp
