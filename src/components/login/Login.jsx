import { useState } from 'react';
import './Login.css';

function Login({ onClose }) {
    const [isRegistering, setIsRegistering] = useState(false);


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
                
                <h2>{ isRegistering ? 'Create Account' : 'Login' }</h2>

                <form>
                     {isRegistering && (
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {isRegistering && (
                        <div className="form-group">
                            <label htmlFor="confirm-password">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirm-password"
                                placeholder="Confirm your password"
                                required
                            />
                        </div>
                    )}

                    <button type="submit">
                        {isRegistering ? 'Register' : 'Login'}
                    </button>
                </form>

                <div className="auth-switch">
                    {isRegistering
                        ? 'Already have an account?'
                        : "Don't have an account?"}

                    <button
                        type="button"
                        onClick={() => setIsRegistering(!isRegistering)}
                    >
                        {isRegistering ? 'Login' : 'Register'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;