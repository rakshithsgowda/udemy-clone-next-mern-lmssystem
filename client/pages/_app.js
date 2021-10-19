import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/antd.css'
// import 'antd/dist/antd.less'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import '../public/css/styles.css'
import TopNav from '../components/TopNav'
import { Provider } from '../context'

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <ToastContainer position='top-center' />
      <TopNav />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
