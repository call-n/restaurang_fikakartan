import { Routes, Route } from 'react-router-dom'
import CreateRestaurantPage from './pages/CreateRestaurantPage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/create-restaurant' element={<CreateRestaurantPage/>}/>
      </Routes>
    </>
  )
}

export default App
