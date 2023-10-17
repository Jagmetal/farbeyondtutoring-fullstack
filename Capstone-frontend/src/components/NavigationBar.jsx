import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Auth, Hub } from 'aws-amplify';
import '../styles/NavigationBar.css';

const NavigationBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await Auth.currentAuthenticatedUser();
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };

    const listener = ({ payload: { event } }) => {
      switch (event) {
        case 'signIn':
          setIsAuthenticated(true);
          break;
        case 'signOut':
          setIsAuthenticated(false);
          break;
        default:
          break;
      }
    };

    checkAuth();
    Hub.listen('auth', listener);
    return () => Hub.remove('auth', listener);
  }, []);

  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const isActive = (path) => {
    return location.pathname === path ? 'active-nav' : '';
  };

  const handleBookNowClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        navigate('/login');
      }, 3000);
    }
  }

  return (
    <>
      {showMessage && (
        <div className="alert alert-warning" role="alert">
          You must create an account to make a booking!
        </div>
      )}
      <Navbar expand="lg" className={isHomePage ? 'home-navbar' : ''}>
        <Link to="/" className="navbar-brand left-title">
          <span className="bold-font">Home</span>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink to="/music-lessons" className={`nav-link bold-font ${isActive('/music-lessons')}`}>Music Lessons</NavLink>
            {/*<NavLink to="/tab-download" className={`nav-link bold-font ${isActive('/tab-download')}`}>Tab Download</NavLink>*/}
            <NavLink
              to="/book-now"
              onClick={handleBookNowClick}
              className={`nav-link bold-font ${isActive('/book-now')}`}
            >
              Book Now
            </NavLink>

            {isAuthenticated
              ? <NavLink to="/profile" className={`nav-link bold-font ${isActive('/profile')}`}>My Bookings</NavLink>
              : <NavLink to="/login" className={`nav-link bold-font ${isActive('/login')}`}>Login</NavLink>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );

};

export default NavigationBar;
