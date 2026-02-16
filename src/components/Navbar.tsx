import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <Link to="/" style={{ marginRight: '1rem' }}>Hem</Link>
        {isAuthenticated && <Link to="/admin" style={{ marginRight: '1rem' }}>Admin</Link>}
      </div>
      <div>
        {isAuthenticated ? (
          <>
            <button onClick={logout}>Logga ut</button>
          </>
        ) : (
          <Link to="/login">Logga in</Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar