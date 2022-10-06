import React from 'react'
import Map from '../components/Map'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

function HomePage() {
  const { logout, isPending } = useLogout()
  const { user } = useAuthContext()

  return (
    <div>
      <Map />
      {user && (
          <li>
            {!isPending && <button className="btn" onClick={logout}>Logout</button>}
            {isPending && <button className="btn" disabled>Logging out...</button>}
          </li>
        )}
    </div>
  )
}

export default HomePage