import { useState, type SubmitEvent } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

// Komponent för inloggningssidan, som hanterar användarens input och anropar login-funktionen från AuthContext
function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()

    // Funktion som hanterar formulärets submit-event, anropar login och navigerar till admin-sidan vid lyckad inloggning, eller visar ett felmeddelande vid misslyckad inloggning
    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')

        try {
            await login(username, password)
            navigate('/admin') // Redirecta till admin efter lyckad login
        } catch (err) {
            setError('Felaktigt användarnamn eller lösenord')
        }
    }

    return (
        <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
            <h1>Logga in</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label>
                        Användarnamn:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value)
                                setError('') // Rensa felmeddelande när användaren börjar skriva
                            }}
                            style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                            required
                        />
                    </label>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>
                        Lösenord:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                setError('') // Rensa felmeddelande när användaren börjar skriva
                            }}
                            style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                            required
                        />
                    </label>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" style={{ padding: '0.5rem 1rem' }}>
                    Logga in
                </button>
            </form>
        </div>
    )
}

export default Login