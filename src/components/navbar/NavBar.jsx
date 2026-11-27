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
      <a className="navbar-brand" href="/">
        <img src="/leffapuntari_logo.png" alt="Home-button" />
      </a>
      <Container>




        <BsNavbar.Toggle aria-controls="navbar-content" />

        <div className="d-flex align-items-center gap-3 flex-wrap w-100">

          <form
            className="d-flex gap-2 align-items-center flex-wrap flex-grow-1"
            onSubmit={handleSubmit}
          >

            <input
              className="form-control"
              placeholder="Etsi mitä vain"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <Nav className="ms-auto">

            {user ? (
              <div className="d-flex align-items-center gap-2">

                <span className="text-white">
                  Tervetuloa, {user.username}
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