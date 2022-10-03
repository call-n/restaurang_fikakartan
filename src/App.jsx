import { Routes, Route } from 'react-router-dom'
import CreateRestaurantPage from './pages/CreateRestaurantPage'
import RestaurantsPage from './pages/RestaurantsPage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/create-restaurant' element={<CreateRestaurantPage/>}/>
        <Route path='/restaurants' element={<RestaurantsPage/>}/>
      </Routes>
    </>
  )
}

export default App
