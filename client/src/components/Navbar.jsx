import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import Auth from '../utils/auth';
import '../styles/Navbar.css';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  const handleNavLinkClick = () => {
    if (window.innerWidth < 767) { // Close navbar if screen size is less than to 768px (Bootstrap md breakpoint)
      const navbarToggler = document.querySelector('.navbar-toggler'); // Select the navbar toggler button
      if (navbarToggler) { // If the navbar toggler button is found
        navbarToggler.click(); // Simulate click on navbar toggler button
      }
    }
  };

  return (
    <>
      <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
        <Container fluid>
            <Navbar.Brand as={Link} to='/home'>
              Eastbound Counts
            </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='respsonive-navbar-nav' className='justify-content-end'>
            <Nav className='ml-auto text-end'>
              {Auth.loggedIn() && (
                <>
                  <Nav.Link as={Link} to='/home' onClick={handleNavLinkClick}>
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to='/fryer' onClick={handleNavLinkClick}>
                    Fryer
                  </Nav.Link>
                  <Nav.Link as={Link} to='/grill' onClick={handleNavLinkClick}>
                    Grill
                  </Nav.Link>
                </>
              )}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>Login</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item> */}
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              {/* <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane> */}
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
