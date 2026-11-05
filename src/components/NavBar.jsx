import React from 'react'
import "./NavBar.css"

export default function NavBar({ searchTerm, setSearchTerm }) {
  return (
    <nav className="navbar">
      <div className="container">
        <a className="navbar-brand" href="/">
          Navbar scroll
        </a>

        <ul className="nav-links">
          <li>
            <a href="#action1">Home</a>
          </li>
          <li>
            <a href="#action2">Link</a>
          </li>

          <li className="dropdown">
            <button className="dropdown-btn">
              Dropdown ▼
            </button>

            <div className="dropdown-content">
              <a href="#action3">Action</a>
              <a href="#action4">Another action</a>
              <hr />
              <a href="#action5">Something else here</a>
            </div>
          </li>

          <li>
            <a href="#" className="disabled">
              Disabled
            </a>
          </li>
        </ul>

        <input 
          placeholder="Search for movies"
          type="search"
          value={ searchTerm }
          onChange={ (event) => setSearchTerm(event.target.value) }
        />
        <button>
          Search
        </button>
      </div>
    </nav>
  );
}



// {/* <li className="nav-item">
//             <Link className="nav-link" to="/">Home</Link>
//           </li>  
//           <li className="nav-item">
//             <Link className="nav-link" to="/settings">Settings</Link>
//           </li>
//           <li className="nav-item">
//             <Link className="nav-link" to="/about">About</Link>
//           </li> */}
