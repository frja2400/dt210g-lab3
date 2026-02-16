import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { AuthContextType } from '../types'
import { useNavigate } from 'react-router-dom'

// Skapar en Context för autentisering
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider-komponent som hanterar autentisering och tillhandahåller token, login och logout funktioner, isAuthenticated och loading boolean
export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    // Hämta token från localStorage vid uppstart
    useEffect(() => {
        const savedToken = localStorage.getItem('token')
        if (savedToken) {
            setToken(savedToken)
        }
        setLoading(false)
    }, [])

    // Funktion för att logga in, som skickar en POST-förfrågan till backend och hanterar token
    const login = async (username: string, password: string) => {
        const response = await fetch('http://localhost:5260/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })

        if (!response.ok) {
            throw new Error('Felaktigt användarnamn eller lösenord')
        }

        const data = await response.json()
        setToken(data.token)
        localStorage.setItem('token', data.token)
    }

    const logout = () => {
        setToken(null)
        localStorage.removeItem('token')
        navigate('/') // Redirecta till startsidan
    }

    const isAuthenticated = !!token

    return (
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

// Custom hook för att använda AuthContext
export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth måste användas inom AuthProvider')
    }
    return context
}