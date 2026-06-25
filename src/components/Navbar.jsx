import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/events', label: 'Events' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <NavLink to="/" className="navbar__logo" onClick={closeMenu}>
          <span className="navbar__logo-mark">CE</span>
          <span className="navbar__logo-text">Campus Event Hub</span>
        </NavLink>

        <nav className={`navbar__links ${isOpen ? 'navbar__links--open' : ''}`}>
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'}
              className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
              onClick={closeMenu}>
              {link.label}
            </NavLink>
          ))}

          {user?.role === 'staff' && (
            <NavLink to="/staff/add-event"
              className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
              onClick={closeMenu}>
              + Add Event
            </NavLink>
          )}

          {user ? (
            <div className="navbar__user">
              <div className="navbar__user-chip">
                <span className={`navbar__user-dot navbar__user-dot--${user.role}`} />
                <div className="navbar__user-info">
                  <span className="navbar__user-name">{user.name}</span>
                  {user.role === 'staff' && user.department && (
                    <span className="navbar__user-dept">{user.department}</span>
                  )}
                  {user.role === 'student' && (
                    <span className="navbar__user-role-label">Student</span>
                  )}
                </div>
              </div>
              <button className="btn btn-outline navbar__logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="btn btn-primary navbar__cta" onClick={closeMenu}>
              Login
            </NavLink>
          )}
        </nav>

        <button
          className={`navbar__toggle ${isOpen ? 'navbar__toggle--open' : ''}`}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
