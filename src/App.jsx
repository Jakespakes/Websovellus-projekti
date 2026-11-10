import { useState } from 'react'
import Home from './components/home/Home'
import Navbar from './components/navbar/NavBar'
import SideBar from './components/sidebar/SideBar'

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <header>
        <Navbar 
          searchQuery={ searchQuery }
          setSearchQuery={ setSearchQuery }
        />
      </header>

      <main>
        <Home
          searchQuery={ searchQuery }
        />
        <SideBar />
      </main>
    </>
  )
}

export default App