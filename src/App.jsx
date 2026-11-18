import { useState } from 'react'
import Home from './components/home/Home'
import Navbar from './components/navbar/NavBar'
import SideBar from './components/sidebar/SideBar'
import Footer from './components/home/Footer/Footer'
import Login from "./components/login/Login"
function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOption, setSearchOption] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  const [user, setUser] = useState(null);
  const [loginMode, setLoginMode] = useState('login');

  const openLogin = (mode = 'login') => {
    setLoginMode(mode);
    setShowLogin(true);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setShowLogin(false);
  }

  // Temporary logout
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Logout failed.');
      }

      setUser(null);

    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="layout">

      <header className="header">
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchOption={searchOption}
          setSearchOption={setSearchOption}
          onLoginClick={() => openLogin('login')}
          user={user}
          onLogout={handleLogout}
        />
      </header>

      <aside className="sidebar">
        <SideBar
          onLoginClick={() => openLogin('login')}
          onRegisterClick={() => openLogin('register')}
          user={user}
          onLogout={handleLogout}
        />
      </aside>

      <main>
        <Home
          searchQuery={searchQuery}
          searchOption={searchOption}
        />
      </main>

      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onLogin={handleLogin}
          initialMode={loginMode}
        />
      )}

      <footer className="footer">
        <Footer />
      </footer>

    </div>
  )
}

export default App