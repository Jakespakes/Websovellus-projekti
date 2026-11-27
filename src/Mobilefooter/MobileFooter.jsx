import "./MobileFooter.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export default function MobileFooter({ onMenuClick }) {
  return (
    <footer className="mobile-footer">

      <Container fluid>

        <Button
          variant="dark"
          onClick={onMenuClick}
        >
          ☰ Valikko
        </Button>

      </Container>

    </footer>
  );
}
