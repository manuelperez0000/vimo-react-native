import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import '../src/styles/index.scss'
import { DataProvider } from '../src/context/DataContext'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'

const App = ({ Component, pageProps }) => <DataProvider>
  <Component {...pageProps} />
</DataProvider>

export default App
