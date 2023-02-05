import '../styles/global.scss'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import NavbarLayout from '../components/layout/navbar-layout'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <NavbarLayout>
      <Component {...pageProps} />
    </NavbarLayout>
  )
}

export default appWithTranslation(App)
