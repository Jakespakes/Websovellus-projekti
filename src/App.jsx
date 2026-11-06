import { useState } from 'react'
import Home from './components/home/Home'
import Navbar from './components/navbar/NavBar'
import SideBar from './components/sidebar/SideBar'

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <header>
        <Navbar 
          value={ searchTerm }
          setSearchTerm={ setSearchTerm }
        />
      </header>

      <main>
        <Home
          searchTerm={ searchTerm }
        />
        <SideBar />
      </main>
    </>
  )
}

export default App