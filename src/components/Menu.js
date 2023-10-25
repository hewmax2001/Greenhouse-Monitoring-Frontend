import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from "react-router-dom";
const now = new Date().toISOString();
function Menu(props) {
    return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand >Dashboard</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Analytics</Nav.Link>
            <Nav.Link ><Link to={"/records"} state={{date: now}}>Records</Link></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
}

export default Menu;