import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
    const { isAuthenticated, logout } = useAuth()

    return (
        <nav className="navbar">
            <div className="navbar__inner">
                <div className="navbar__links">
                    <Link to="/">HEM</Link>
                    {isAuthenticated && <Link to="/admin">ADMIN</Link>}
                </div>
                <div className="navbar__auth">
                    {isAuthenticated ? (
                        <button className="btn--login" onClick={logout}>LOGGA UT</button>
                    ) : (
                        <Link to="/login" className="btn--login">LOGGA IN</Link>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar