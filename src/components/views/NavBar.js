import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar
      bg='primary'
      variant='dark'
      className='justify-content-between mt-4 mb-4  rounded'>
      <Navbar.Brand as={NavLink} to='/' className='ms-4'>
        Waiter.app
      </Navbar.Brand>
      <Nav className='me-4'>
        <Nav.Link as={NavLink} to='/'>
          Home
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavBar;