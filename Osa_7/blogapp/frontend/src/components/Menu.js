import { Link } from "react-router-dom"
import { Navbar, Nav } from "react-bootstrap"

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
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/users">
                  users
                </Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/blogs">
                  blogs
                </Link>
              </Nav.Link>
              {user.name} logged in
              <button onClick={handleClick}>logout</button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }

export default Menu