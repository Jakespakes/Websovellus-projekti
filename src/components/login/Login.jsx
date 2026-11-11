import './Login.css';

function Login({ onClose }) {
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
                
                <h2>Login</h2>

                <form>
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

                    <button type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;