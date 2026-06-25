import { Link } from 'react-router-dom';
import './Footer.css';

/**
 * Footer
 * Site-wide footer with brand blurb, quick links, contact info,
 * social icons and a copyright line.
 */
function Footer() {
  const year = new Date().getFullYear();

  const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/events', label: 'Events' },
    { to: '/register', label: 'Register' },
    { to: '/contact', label: 'Contact' },
  ];

  const socials = [
    { label: 'Instagram', href: '#', icon: 'instagram' },
    { label: 'X / Twitter', href: '#', icon: 'twitter' },
    { label: 'LinkedIn', href: '#', icon: 'linkedin' },
    { label: 'YouTube', href: '#', icon: 'youtube' },
  ];

  // Small inline icon set so the project needs no external icon library.
  const icons = {
    instagram: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
      </svg>
    ),
    twitter: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 4l16 16M20 4L4 20" strokeLinecap="round" />
      </svg>
    ),
    linkedin: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <line x1="7.5" y1="10" x2="7.5" y2="16.5" />
        <circle cx="7.5" cy="7" r="0.6" fill="currentColor" />
        <path d="M11.5 16.5V10M11.5 12.5c0-1.4 1.1-2.5 2.5-2.5s2.3 1.1 2.3 2.5v4" />
      </svg>
    ),
    youtube: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="6" width="18" height="12" rx="4" />
        <path d="M11 9.8l4 2.2-4 2.2z" fill="currentColor" stroke="none" />
      </svg>
    ),
  };

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__col footer__brand">
          <div className="footer__logo">
            <span className="footer__logo-mark">CE</span>
            Campus Event Hub
          </div>
          <p>
            The one stop platform to discover, plan and register for every
            hackathon, fest, workshop and meet happening on campus this year.
          </p>
          <ul className="footer__socials">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} aria-label={s.label} className="footer__social-icon">
                  {icons[s.icon]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>Quick Links</h4>
          <ul className="footer__links">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>Contact</h4>
          <ul className="footer__contact">
            <li>events@campushub.edu</li>
            <li>+91 98765 43210</li>
            <li>Student Activity Center, Main Campus</li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>&copy; {year} Campus Event Hub. All rights reserved.</p>
        <p>Built with care for student communities everywhere.</p>
      </div>
    </footer>
  );
}

export default Footer;
