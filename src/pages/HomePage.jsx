import React from 'react'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

function HomePage() {
  const { logout, isPending } = useLogout()
  const { user } = useAuthContext()

  return (
    <div>
      <h1>HomePage</h1>
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