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
  const handleLogout = () => { setUser(null);};
  
  return (
    <>
      <header>

        <Navbar 
          searchQuery={ searchQuery }
          setSearchQuery={ setSearchQuery }
          searchOption={ searchOption }
          setSearchOption={ setSearchOption }
          onLoginClick={() => openLogin('login') }
          user={user}
          onLogout={handleLogout}
        />
      </header>

      <main>
        <Home
          searchQuery={searchQuery}
          searchOption={ searchOption }
        />
        <SideBar
          onLoginClick={() => openLogin('login')}
          onRegisterClick={() => openLogin('register')}
          user={user}
          onLogout={handleLogout}
          />
      </main>

      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onLogin={handleLogin}
          initialMode={loginMode}
        />
      )}
      <Footer />
    </>
  )
}

export default App