import { useState } from 'react'
import Home from './components/home/Home'
import Navbar from './components/navbar/NavBar'
import SideBar from './components/sidebar/SideBar'
import Login from './components/login/Login'

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <header>
        <Navbar 
          searchQuery={ searchQuery }
          setSearchQuery={ setSearchQuery }
          onLoginClick={() => setShowLogin(true) }
        />
      </header>

      <main>
        <Home
          searchQuery={ searchQuery }
        />
        <SideBar />
      </main>
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
    </>
  )
}

export default App