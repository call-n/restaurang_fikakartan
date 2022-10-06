import './assets/App.scss'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import Navigation from './components/Navigation'
import CreateRestaurantPage from './pages/CreateRestaurantPage'
import RestaurantsPage from './pages/RestaurantsPage'
import HomePage from './pages/HomePage'
import RestaurantPage from './pages/RestaurantPage'
import UpdateRestaurantPage from './pages/UpdateRestaurantPage'
import TipsPage from './pages/TipsPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import PageNotFound from './pages/PageNotFound'

function App() {
  const { authIsReady, user } = useAuthContext()

  return (
    <div id='App'>
      {authIsReady && (
        <Navigation/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>

          <Route path='update-restaurant/:id' element={<UpdateRestaurantPage/>}/>
          <Route path='/create-restaurant' element={<CreateRestaurantPage/>}/>
          <Route path='restaurant/:id' element={<RestaurantPage/>}/>
          <Route path='/restaurants' element={<RestaurantsPage/>}/>
          <Route path='/tips' element={<TipsPage/>} />
          <Route path="*" element={<NotFound />} />
          
        </Routes>
      )}
      </div>
  )
}

export default App
