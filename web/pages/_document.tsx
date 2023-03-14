import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className='has-navbar-fixed-top has-background-primary is-fullheight'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
