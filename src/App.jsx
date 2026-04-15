import { HashRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CountryDetails from './pages/CountryDetails'
import NotFound from './pages/NotFound'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/country/:name" element={<CountryDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  )
}

export default App