<<<<<<< HEAD
import Home from './components/home/Home'
import Navbar from './components/navbar/NavBar'
import { useState } from 'react'
=======
import MovieList from './components/MovieList'
import Navbar from './components/navbar/NavBar'
import SideBar from './components/sidebar/SideBar'

>>>>>>> 91e39959bae47fe3fc82d08fdc02dcd11a00661c

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
<<<<<<< HEAD
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
=======
    <Navbar />

      <SideBar />

      <main>
        <MovieList />
>>>>>>> 91e39959bae47fe3fc82d08fdc02dcd11a00661c
      </main>
    </>
  )
}

export default App