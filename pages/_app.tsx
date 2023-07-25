import { AppProps } from 'next/app'
import '../styles/global.css'
import initAuth from '../initAuth' // the module you created above
import LayoutNavbar from '../layout/LayoutNavbar'
import { GlobalContext, GlobalcontextProdiver } from '../context/GlobalContext'

initAuth()
function MyApp({ Component, pageProps }: AppProps) {

  return (
    <LayoutNavbar>
      <GlobalcontextProdiver>
      <Component {...pageProps} />
      </GlobalcontextProdiver>
    </LayoutNavbar>
  )
}

export default MyApp