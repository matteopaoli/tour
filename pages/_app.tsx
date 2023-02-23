import '../styles/global.scss'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import NavbarLayout from '../components/layout/navbar-layout'
import { AnimatePresence } from 'framer-motion'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AnimatePresence>
      <NavbarLayout>
        <Component {...pageProps} />
      </NavbarLayout>
    </AnimatePresence>
  )
}

export default appWithTranslation(App)
