import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import CreateRestaurantPage from './pages/CreateRestaurantPage'
import RestaurantsPage from './pages/RestaurantsPage'
import HomePage from './pages/HomePage'
import RestaurantPage from './pages/RestaurantPage'
import UpdateRestaurantPage from './pages/UpdateRestaurantPage'
import TipsPage from './pages/TipsPage'

function App() {

  return (
    <div id='App'>
      <Navigation/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>

        <Route path='update-restaurant/:id' element={<UpdateRestaurantPage/>}/>
        <Route path='/create-restaurant' element={<CreateRestaurantPage/>}/>
        <Route path='restaurant/:id' element={<RestaurantPage/>}/>
        <Route path='/restaurants' element={<RestaurantsPage/>}/>
        <Route path='/tips' element={<TipsPage/>} />
      </Routes>
      </div>
  )
}

export default App
