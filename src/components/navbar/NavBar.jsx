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
