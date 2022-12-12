import './assets/App.scss'
import { Route, Routes, Navigate } from 'react-router-dom'
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
import { useAuthContext } from "./contexts/AuthContext";
import UpdateProfila from './pages/UpdateProfila'


function App() {
  const { currentUser, isAdmin } = useAuthContext();
  
  return (
    <div id='App'>
          <Navigation/>
          <Routes>
            {/* Public Routes */}
            <Route path='/' element={<HomePage/>}/>
            <Route path='/create-tip' element={<CreateTipPage/>}/>
            <Route path="/register" element={currentUser ? <Navigate to="/" /> : <RegisterPage />} />
            <Route path="/login" element={currentUser ? <Navigate to="/" /> : <LoginPage />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path='restaurant/:id' element={  <RestaurantPage />}/>
            <Route path='/restaurants' element={  <RestaurantsPage />}/>
            <Route path='/updateProfila' element={!currentUser ? <Navigate to="/" /> : <UpdateProfila />}/>

            {/* Protected routes */}
            <Route path='update-restaurant/:id' element={!isAdmin ? <Navigate to="/login" /> : <UpdateRestaurantPage />}/>
            <Route path='/create-restaurant' element={!isAdmin ? <Navigate to="/login" /> : <CreateRestaurantPage />}/>
            <Route path='/tips' element={!isAdmin? <Navigate to="/login" /> : <TipsPage />} />
            <Route path='/tip/:id' element={!isAdmin? <Navigate to="/login" /> : <TipPage />} />
            <Route path='/admin' element={!isAdmin? <Navigate to="/login" /> : <AdminPage />} />

          </Routes>
      </div>
  )
}

export default App
