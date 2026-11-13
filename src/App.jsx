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

  return (
    <>
      <header>

        <Navbar 
          searchQuery={ searchQuery }
          setSearchQuery={ setSearchQuery }
          searchOption={ searchOption }
          setSearchOption={ setSearchOption }
          onLoginClick={() => setShowLogin(true) }
        />
      </header>

      <main>
        <Home
          searchQuery={searchQuery}
          searchOption={ searchOption }
        />
        <SideBar
          onLoginClick={() => setShowLogin(true)} 
          />
      </main>
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
      <Footer />
    </>
  )
}

export default App