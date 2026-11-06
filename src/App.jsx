import MovieList from './components/MovieList'
import Navbar from './components/navbar/NavBar'
import SideBar from './components/sidebar/SideBar'


function App() {
  return (
    <>
    <Navbar />

      <SideBar />

      <main>
        <MovieList />
      </main>
    </>
  )
}

export default App
