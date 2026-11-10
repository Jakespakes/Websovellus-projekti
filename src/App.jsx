import { useState } from 'react'
import Home from './components/home/Home'
import Navbar from './components/navbar/NavBar'
import SideBar from './components/sidebar/SideBar'
import Footer from './components/home/Footer/Footer'
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
      <Footer/>
    </>
  )
}

export default App