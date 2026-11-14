import "./NavBar.css"

export default function NavBar({ searchQuery, setSearchQuery, onLoginClick, searchOption, setSearchOption, user, onLogout }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  }

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

        </ul>

        <form className="search-form" onSubmit={handleSubmit}>
          <label htmlFor="movie-search">Search for a movie</label>
          <input
            id="movie-search"
            placeholder="Search for a movie"
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="search-input-field"
          />
          <label>
            <input
              type="checkbox"
              name="searchType"
              value="movie"
              checked={searchOption === "movie"}
              onChange={e => setSearchOption(e.target.value)}
            />
            Movie
          </label>
          <label>
            <input
              type="checkbox"
              name="searchType"
              value="person"
              checked={searchOption === "person"}
              onChange={e => setSearchOption(e.target.value)}
            />
            Person
          </label>
        </form>

        {user ? (
          <div className="user-section">
            <span>Welcome, {user.username} </span>

            <button
              className="login-button"
              onClick={onLogout}
            >
              LOGOUT
            </button>
          </div>
        ) : (
          <button
            className="login-button"
            onClick={onLoginClick}
          >
           Login
          </button>
        )}
      </div>
    </nav >
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
