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
import TipPage from './pages/TipPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PageNotFound from './pages/PageNotFound'
import CreateTipPage from './pages/CreateTipPage'
import AdminPage from './pages/AdminPage'

function App() {
  const { authIsReady, user } = useAuthContext()

  return (
    <div id='App'>
      {authIsReady && (
        <>
          <Navigation/>
          <Routes>
            {/* Public Routes */}
            <Route path='/' element={<HomePage/>}/>
            <Route path='/create-tip' element={<CreateTipPage/>}/>
            <Route path="/register" element={user ? <Navigate to="/" /> : <RegisterPage />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
            <Route path="*" element={<PageNotFound />} />

            {/* Protected routes */}
            <Route path='update-restaurant/:id' element={!user ? <Navigate to="/login" /> : <UpdateRestaurantPage />}/>
            <Route path='/create-restaurant' element={!user ? <Navigate to="/login" /> : <CreateRestaurantPage />}/>
            <Route path='restaurant/:id' element={!user ? <Navigate to="/login" /> : <RestaurantPage />}/>
            <Route path='/restaurants' element={!user ? <Navigate to="/login" /> : <RestaurantsPage />}/>
            <Route path='/tips' element={!user ? <Navigate to="/login" /> : <TipsPage />} />
            <Route path='/tip/:id' element={!user ? <Navigate to="/login" /> : <TipPage />} />
            <Route path='/admin' element={!user ? <Navigate to="/login" /> : <AdminPage />} />

          </Routes>
        </>
      )}
      </div>
  )
}

export default App
