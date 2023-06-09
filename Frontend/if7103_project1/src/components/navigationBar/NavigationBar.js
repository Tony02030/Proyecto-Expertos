import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function NavigationBar ({ user , setUser }) {

    const handleLogout = () => {
        setUser([])
    }

    return(
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/personalityTest">Test de inteligencia</Nav.Link>
                    <Nav.Link as={Link} to="/match">Match</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Nav className="justify-content-end">
                    <Nav.Link as={Link} to="/" onClick={handleLogout}>Cerrar sesión</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )

}