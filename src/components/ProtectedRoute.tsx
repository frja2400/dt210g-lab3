import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import type { ReactNode } from 'react'

interface ProtectedRouteProps {
    children: ReactNode
}

// Om användaren inte är autentiserad, omdirigera till login-sidan. Annars rendera barnkomponenterna (Admin-sidan i detta fall)
function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated, loading } = useAuth()

    // Vänta tills vi vet om användaren är inloggad
    if (loading) {
        return <div style={{ padding: '2rem' }}>Laddar...</div>
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return <>{children}</>
}

export default ProtectedRoute