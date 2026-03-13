import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AccountCircle, Menu, Close } from '@mui/icons-material';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../redux/actions/userActions'; // Make sure you have this CSS

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleUserDropdown = () => setUserDropdown(!userDropdown);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);
  const isAdmin = user?.role === 'admin';

  const handleLogout = () => {
    dispatch(userLogout());
  };

  // Close user dropdown on outside click
  useEffect(() => {
    const handleClickOutsideUser = (e) => {
      if (userDropdown && userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutsideUser);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideUser);
    };
  }, [userDropdown]);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutsideMobile = (e) => {
      if (menuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutsideMobile);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideMobile);
    };
  }, [menuOpen]);

  return (
    <nav className="navbar" ref={mobileMenuRef}>
      <div className="navbar-logo">
        <span className="logo-bold">King </span>
        <span className="logo-red">Cars</span>
      </div>

      {/* Desktop Links */}
      <ul className="nav-links desktop-only">
        <li>
          <NavLink to="/home">Home</NavLink>
        </li>
        <li>
          <NavLink to="/cars">Cars</NavLink>
        </li>
        {isAdmin && (
          <>
            <li>
              <NavLink to="/admin/cars/new">Add Car</NavLink>
            </li>
            <li>
              <NavLink to="/admin/offers">Offers</NavLink>
            </li>
            <li>
              <NavLink to="/admin/reports">Reports</NavLink>
            </li>
          </>
        )}
      </ul>

      <div className="nav-right">
        {/* Desktop User Icon */}
        <div className="user-icon desktop-only" ref={userMenuRef} onClick={toggleUserDropdown}>
          <AccountCircle className="icon" />
          {userDropdown && (
            <div className="dropdown">
              <NavLink to="/profile">Profile</NavLink>
              <NavLink to="/my-bookings">My Bookings</NavLink>
              {isAdmin && <NavLink to="/admin/reports">Admin Reports</NavLink>}
              <div onClick={handleLogout}>Logout</div>
            </div>
          )}
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? <Close /> : <Menu />}
        </button>
      </div>

      {/* Mobile Links */}
      {menuOpen && (
        <div className="mobile-menu">
          <ul>
            <li>
              <NavLink to="/home" onClick={toggleMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/cars" onClick={toggleMenu}>
                Cars
              </NavLink>
            </li>
            {isAdmin && (
              <>
                <li>
                  <NavLink to="/admin/cars/new" onClick={toggleMenu}>
                    Add Car
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/offers" onClick={toggleMenu}>
                    Offers
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/reports" onClick={toggleMenu}>
                    Reports
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink to="/profile" onClick={toggleMenu}>
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/my-bookings" onClick={toggleMenu}>
                My Bookings
              </NavLink>
            </li>
            <li
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
