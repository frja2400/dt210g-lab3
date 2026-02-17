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
        <div className="login-box">
            <h1>Logga in</h1>
            <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
                <div className="form-group">
                    <label htmlFor="username">Användarnamn</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => { setUsername(e.target.value); setError('') }}     // Rensa felmeddelande när användaren börjar skriva
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Lösenord</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setError('') }}    // Rensa felmeddelande när användaren börjar skriva
                        required
                    />
                </div>
                {error && <p className="form-error">{error}</p>}
                <button type="submit" className="btn btn--primary">LOGGA IN</button>
            </form>
        </div>
    )
}

export default Login