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
import useGetUsers from "./hooks/useGetUsers"


function App() {
  const { authIsReady, user } = useAuthContext()

  const {data: users, error, isError, isLoading} = useGetUsers('users')

  // const admin = null

  // if (user){
	//   admin =  users.filter(u => u.displayName === user.displayName)
  // } 

  const admin = user === null ? [] : users.filter(u => u.displayName === user.displayName)

console.log(admin);
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
            <Route path='restaurant/:id' element={  <RestaurantPage />}/>
            <Route path='/restaurants' element={  <RestaurantsPage />}/>

            {/* Protected routes */}
            <Route path='update-restaurant/:id' element={!admin[0]?.admin ? <Navigate to="/login" /> : <UpdateRestaurantPage />}/>
            <Route path='/create-restaurant' element={!admin[0]?.admin ? <Navigate to="/login" /> : <CreateRestaurantPage />}/>
            <Route path='/tips' element={!admin[0]?.admin ? <Navigate to="/login" /> : <TipsPage />} />
            <Route path='/tip/:id' element={!admin[0]?.admin ? <Navigate to="/login" /> : <TipPage />} />
            <Route path='/admin' element={!admin[0]?.admin ? <Navigate to="/login" /> : <AdminPage />} />

          </Routes>
        </>
      )}
      </div>
  )
}

export default App
