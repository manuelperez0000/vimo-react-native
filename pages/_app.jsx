import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import '../src/styles/index.scss'
import { DataProvider } from '../src/context/DataContext'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import Notify from '../src/components/Notify'
import Miracle from '../src/components/miracle'
const App = ({ Component, pageProps }) => <DataProvider>
  <Notify />
  <Miracle />
  <Component {...pageProps} />
</DataProvider>

export default App
