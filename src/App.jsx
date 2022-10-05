import { Route, Routes, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import PageNotFound from './pages/PageNotFound'

function App() {
  const { authIsReady, user } = useAuthContext()

  return (
    <div>
      {authIsReady && (
        <div>
          <Routes>
						<Route exact path="/" element={<HomePage />} />
						
						<Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />

            <Route path="/register" element={user ? <Navigate to="/" /> : <RegisterPage />} />

						<Route path="*" element={<PageNotFound />}/>
					</Routes>
        </div>
      )}
    </div>
  )
}

export default App
