import { useState } from 'react'
import Home from './components/home/Home'
import Navbar from './components/navbar/NavBar'
import SideBar from './components/sidebar/SideBar'
import Footer from './components/home/Footer/Footer'
import Login from "./components/login/Login"
import GroupCreation from './group/GroupCreation'

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOption, setSearchOption] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [showGroupCreation, setShowGroupCreation] = useState(false);
  const [groupSuccessMessage, setGroupSuccessMessage] = useState('');

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
          onCreateGroupClick={() => setShowGroupCreation(true)}
          user={user}
          onLogout={handleLogout}
          />
      </main>

      {groupSuccessMessage && (
            <div className="success-notification">
              {groupSuccessMessage}
            </div>
          )}
      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onLogin={handleLogin}
          initialMode={loginMode}
        />
      )}
      {showGroupCreation && (
        <GroupCreation
          onClose={() => setShowGroupCreation(false)}
          onSuccess={(groupName) => {
            setShowGroupCreation(false);
            setGroupSuccessMessage(
              `Group "${groupName}" created successfully!`
            );

            setTimeout(() => {
              setGroupSuccessMessage('');
            }, 5000);
          }}
        />
)}
      <Footer />
    </>
  )
}

export default App