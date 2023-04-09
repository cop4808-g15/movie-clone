import '@/styles/globals.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NavBar from './navBar'

export default function App({ Component, pageProps }) {
  return (
    <div>
      <ToastContainer autoClose={2000} />
      <NavBar  />
      <Component {...pageProps} />
    </div>
  )
}
