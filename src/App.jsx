import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import Navbar from './components/navbar/NavBar'
import SideBar from './components/sidebar/SideBar'
import Footer from './components/home/Footer/Footer'
import Login from "./components/login/Login"
import GroupCreation from './group/GroupCreation'
import GroupSite from './group/GroupSite'
import './App.css'
function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [showGroupCreation, setShowGroupCreation] = useState(false);
  const [groupSuccessMessage, setGroupSuccessMessage] = useState('');
  const [groupsRefreshTrigger, setGroupsRefreshTrigger] = useState(0);

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
          onLoginClick={() => openLogin('login')}
          user={user}
          onLogout={handleLogout}
        />
      </header>

      <aside className="sidebar">
        <SideBar
          onLoginClick={() => openLogin('login')}
          onRegisterClick={() => openLogin('register')}
          onCreateGroupClick={() => setShowGroupCreation(true)}
          user={user}
          onLogout={handleLogout}
          refreshTrigger={groupsRefreshTrigger}
        />
      </aside>

      <main className="content">
        <Routes>
          {/* Homepage */}
          <Route
            path="/"
            element={
              <Home
                searchQuery={searchQuery}
              />
            }
          />
          {/* Reusable route for groups */}
          <Route
            path="/groups/:groupID"
            element={<GroupSite />}
          />
        </Routes>
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
            setGroupsRefreshTrigger(prev => prev + 1);
            setGroupSuccessMessage(
              `Ryhmä "${groupName}" luotu onnistuneesti!`
            );

            setTimeout(() => {
              setGroupSuccessMessage('');
            }, 5000);
          }}
        />
)}
      <Footer />
    </div>
  )
}

export default App