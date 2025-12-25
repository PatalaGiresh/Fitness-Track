// import React,{useState} from 'react';
// import { Navbar, Nav, Button,Modal } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import { LinkContainer } from 'react-router-bootstrap';
// import { logout } from '../redux/actions/authActions';
// import "../index.css"
// import { useNavigate, Link } from 'react-router-dom';
// const AppNavbar = () => {
//   const dispatch = useDispatch();
//   const { userInfo } = useSelector((state) => state.userLogin);
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/login')
//   };

//   return (
//     <>
//     <Navbar bg="black" variant="dark" expand="lg" collapseOnSelect>
//       <Navbar.Brand as={Link} to="/" className="me-auto px-2">Fitness Track</Navbar.Brand>
//       <Navbar.Toggle aria-controls="basic-navbar-nav" />
//       <Navbar.Collapse id="basic-navbar-nav">
//         <Nav className="ms-auto px-2">
//         {/* <DarkModeToggle /> */}
//           {userInfo && (
//             <>
//               <LinkContainer to="/profile">
//                 <Nav.Link>Profile</Nav.Link>
//               </LinkContainer>
             
//              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              
//               {/* <Button variant="outline-light" onClick={handleLogout}>
//                 Logout
//               </Button>  */}
//             </>
//           )}
//         </Nav>
//       </Navbar.Collapse>
//     </Navbar>
//     <Modal show={showModal} onHide={() => setShowModal(false)}>
//     <Modal.Header closeButton>
//       <Modal.Title>Confirm Logout</Modal.Title>
//     </Modal.Header>
//     <Modal.Body>Are you sure you want to log out?</Modal.Body>
//     <Modal.Footer>
//       <Button variant="secondary" onClick={() => setShowModal(false)}>
//         Cancel
//       </Button>
//       <Button variant="primary" onClick={handleLogout}>
//         Logout
//       </Button>
//     </Modal.Footer>
//   </Modal>
//   </>
//   );
// };

// export default AppNavbar;


import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../redux/actions/authActions';
import "../index.css"
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaSun, FaMoon, FaUser } from 'react-icons/fa';

const AppNavbar = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const [showModal, setShowModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we should show back button (not on home/dashboard)
  const showBackButton = !['/home', '/dashboard', '/login', '/signup', '/'].includes(location.pathname);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.classList.add('dark-mode');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.classList.remove('dark-mode');
    }
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Navbar bg="black" variant="dark" expand="lg" collapseOnSelect className="navbar-custom">
        <div className="d-flex align-items-center">
          {showBackButton && (
            <Button 
              variant="outline-light" 
              onClick={handleBack}
              className="back-button me-2"
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0
              }}
            >
              <FaArrowLeft />
            </Button>
          )}
        </div>

        {/* Centered Brand Title */}
        <Navbar.Brand 
          as={Link} 
          to={userInfo ? "/dashboard" : "/"} 
          className="mx-auto navbar-brand-center"
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        >
          <span style={{
            background: 'linear-gradient(90deg, #2ec4b6, #4361ee)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: '800',
            fontSize: '1.8rem',
            letterSpacing: '1px'
          }}>
            Fitness Track
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto px-2 d-flex align-items-center">
            {/* Theme Toggle Button */}
            <Button 
              variant="outline-light" 
              onClick={toggleDarkMode}
              className="theme-toggle-btn me-3"
              style={{
                background: 'transparent',
                border: '2px solid rgba(255,255,255,0.2)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0
              }}
            >
              {darkMode ? <FaSun className="dark-mode-icon" /> : <FaMoon className="dark-mode-icon" />}
            </Button>

            {userInfo && (
              <>
                {/* Profile Button with Icon */}
                <LinkContainer to="/profile">
                  <Button 
                    variant="outline-light" 
                    className="profile-btn me-2"
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <FaUser />
                    <span>Profile</span>
                  </Button>
                </LinkContainer>
               
                {/* Logout Button */}
                <Button 
                  variant="outline-danger" 
                  onClick={() => setShowModal(true)}
                  style={{
                    borderRadius: '20px',
                    borderWidth: '2px'
                  }}
                >
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Logout Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AppNavbar;