import { useState } from 'react';
import './Login.css';

function Login({ onClose, onLogin, initialMode = 'login' }) {
    const [isRegistering, setIsRegistering] = useState(
        initialMode === 'register'
    );

// Form states
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // API states
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    //Reset form when toggling mode
    const toggleMode = () => {
        setIsRegistering(!isRegistering);
        setMessage('');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage('');

        // Password confirmation
        if (isRegistering && password !== confirmPassword) 
        {
            setMessage('Salasanat eivät täsmää!');
            return;
        }

        setLoading(true);

        try
        {
            const endpoint = isRegistering
                ? '/register'
                : '/login';
        
            const body = isRegistering
                ? { username, email, password }
                : { email, password };

            const response = await fetch(
                `/api/auth${endpoint}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(body)
                }
            )

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Jotain meni pieleen.');
            }

            setMessage(data.message || 'Success!');

            if (!isRegistering) {
                if (!data.user) {
                    throw new Error('Emme löytäneet käyttäjää näillä tunnuksilla.');
                }
                // Login successful.
                onLogin(data.user);
            }
            else {
                // Clear password fields after successfull registration
                setPassword('');
                setConfirmPassword('');
            }

        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="auth-container">
            <div className="auth-card">

                <button
                    type="button"
                    className="close-button"
                    onClick={onClose}
                >
                    &times;
                </button>
                
                <h2>{ isRegistering ? 'Luo käyttäjä' : 'Kirjaudu sisään' }</h2>

                <form onSubmit={handleSubmit}>
                     {isRegistering && (
                        <div className="form-group">
                            <label htmlFor="username">Käyttäjänimi</label>
                            <input
                                type="text"
                                id="username"
                                placeholder="Käyttäjänimi"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="email">Sähköposti</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Sähköposti"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Salasana</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Salasana"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {isRegistering && (
                        <div className="form-group">
                            <label htmlFor="confirm-password">
                                Toista salasana
                            </label>
                            <input
                                type="password"
                                id="confirm-password"
                                placeholder="Toista salasana"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    {message && (
                        <p className="auth-message">
                            {message}
                        </p>
                    )}

                    <button type="submit" disabled={loading}>
                        {loading
                            ? 'Odota hetki...'
                            : isRegistering 
                                ? 'Rekisteröidy'
                                : 'Kirjaudu sisään'}
                    </button>
                </form>

                <div className="auth-switch">
                    {isRegistering
                        ? 'Onko sinulla jo käyttäjätili?'
                        : 'Eikö sinulla ole käyttäjätiliä?'}

                    <button
                        type="button"
                        onClick={toggleMode}
                        disabled={loading}
                    >
                        {isRegistering ? 'Kirjaudu sisään' : 'Rekisteröidy'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;