import Home from './components/home/Home'
import Navbar from './components/navbar/NavBar'
import { useState } from 'react'

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
      </main>
    </>
  )
}

export default App