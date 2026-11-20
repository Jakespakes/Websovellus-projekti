import "./NavBar.css"

export default function NavBar({ searchQuery, setSearchQuery, onLoginClick, searchOption, setSearchOption, user, onLogout }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <nav className="navbar">
      <div className="container">
        <a className="navbar-brand" href="/">
          <img src="../public/movie_icon.png" alt="Home button"/>
        </a>

        <form className="search-form" onSubmit={handleSubmit}>
          <input
            id="movie-search"
            placeholder="Etsi elokuvia"
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="search-input-field"
          />
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
