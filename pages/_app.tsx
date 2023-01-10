import '../styles/global.scss'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import BaseLayout from '../layouts/base-layout'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Component {...pageProps} />
  )
}

export default appWithTranslation(App)
