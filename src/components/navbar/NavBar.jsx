import "./NavBar.css"

export default function NavBar({ searchQuery, setSearchQuery, onLoginClick, user, onLogout }) {
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
          <label htmlFor="movie-search">Etsi mitä vain</label>
          <input
            id="movie-search"
            placeholder="Etsi mitä vain"
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="search-input-field"
          />
        </form>

        {user ? (
          <div className="user-section">
            <span>Tervetuloa, {user.username} </span>

            <button
              className="login-button"
              onClick={onLogout}
            >
              Kirjaudu ulos
            </button>
          </div>
        ) : (
          <button
            className="login-button"
            onClick={onLoginClick}
          >
           Kirjaudu sisään
          </button>
        )}
      </div>
    </nav >
  );
}
