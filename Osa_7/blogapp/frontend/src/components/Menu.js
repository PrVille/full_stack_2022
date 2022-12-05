import { Link } from "react-router-dom"
import { Navbar, Nav, Button } from "react-bootstrap"

const Menu = ({ user, logout }) => {
  const padding = {
    paddingRight: 5,
  }

  const handleClick = () => {
    logout()
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="justify-content-center">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">
                Users
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/blogs">
                Blogs
              </Link>
            </Nav.Link>
            <Nav.Link eventKey="disabled" disabled>
              {user.name} logged in
            </Nav.Link>
            <Button variant="danger" onClick={handleClick}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Menu
