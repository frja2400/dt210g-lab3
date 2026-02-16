import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Hem</Link>
      <Link to="/login" style={{ marginRight: '1rem' }}>Logga in</Link>
      <Link to="/admin">Admin</Link>
    </nav>
  )
}

export default Navbar