import { useState } from 'react'
import Home from './components/home/Home'
import Navbar from './components/navbar/NavBar'
import SideBar from './components/sidebar/SideBar'
import Footer from './components/home/Footer/Footer'
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
      <Footer/>
    </>
  )
}

export default App