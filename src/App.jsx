import './assets/App.scss'
import {Routes, Route} from 'react-router-dom'

import HomePage from './pages/HomePage'
import NotFound from './pages/NotFoundPage'
function App() {

  return (
    <div>
        <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<HomePage />} />
        </Routes>
    </div>
  )
}

export default App
