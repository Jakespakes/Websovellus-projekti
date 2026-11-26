import "./Footer.css";
import Container from "react-bootstrap/Container";


export default function Footer() {
  return (
    <footer className="BS-Footer">
      <Container>

        <div className="movie-footer">

          <h3>Movie Database</h3>
          <p>© 2026 Kaikki oikeudet pidätetään.</p>

        </div>
      </Container>
    </footer >
  );
}