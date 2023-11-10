import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from "react-router-dom";
const now = new Date().toISOString();

// Navigation NavigationBar component
function NavigationBar(props) {
    return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand >Monitoring Page</Navbar.Brand>
          <Nav className="me-auto">
              {/* Link to dashboard page */}
              <Nav.Link href="/">Dashboard</Nav.Link>

              {/* Link to records page */}
              <Nav.Link ><Link to={"/records"} state={{date: now.slice(0, 10)}}>Records</Link></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
}

export default NavigationBar;