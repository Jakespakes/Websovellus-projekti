import "./NavBar.css";

import BsNavbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

export default function NavBar({
  searchQuery,
  setSearchQuery,
  onLoginClick,
  searchOption,
  setSearchOption,
  user,
  onLogout
}) {

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <BsNavbar
      variant="dark"
      expand="lg"
      fixed="top"
      className="movie-NavBar"
    >
      <Container>

        <BsNavbar.Brand href="/">
          Movie Database
        </BsNavbar.Brand>

        <BsNavbar.Toggle aria-controls="navbar-content" />

        <div className="d-flex align-items-center gap-3 flex-wrap w-100">

          <form
            className="d-flex gap-2 align-items-center flex-wrap"
            onSubmit={handleSubmit}
          >

            <input
              className="form-control"
              placeholder="Search for a movie"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <label className="text-white">
              <input
                type="radio"
                value="movie"
                checked={searchOption === "movie"}
                onChange={(e) => setSearchOption(e.target.value)}
              />
              {" "}Movie
            </label>

            <label className="text-white">
              <input
                type="radio"
                value="person"
                checked={searchOption === "person"}
                onChange={(e) => setSearchOption(e.target.value)}
              />
              {" "}Person
            </label>

          </form>

          <Nav className="ms-auto">

            {user ? (
              <div className="d-flex align-items-center gap-2">

                <span className="text-white">
                  Welcome, {user.username}
                </span>

                <Button
                  variant="outline-light"
                  onClick={onLogout}
                >
                  Kirjaudu ulos
                </Button>

              </div>
            ) : (
              <Button
                variant="outline-light"
                onClick={onLoginClick}
              >
                Kirjaudu sisään
              </Button>
            )}

          </Nav>

        </div>
      
      </Container>
    </BsNavbar>
  );
}