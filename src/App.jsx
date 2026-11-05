import MovieList from './components/MovieList'
import Navbar from './components/NavBar'
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
        <MovieList
          searchTerm={ searchTerm }
        />
      </main>
    </>
  )
}

export default App