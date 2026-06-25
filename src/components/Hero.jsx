import { Link } from 'react-router-dom';
import './Hero.css';

/**
 * Hero
 * Full-width gradient banner for the Home page.
 * Props let the headline/subtitle/CTA be reused or swapped without
 * touching the markup — keeps the component generic, not page-specific.
 */
function Hero({
  eyebrow = 'Campus Event Hub',
  heading = 'Discover Exciting Campus Events',
  subtitle = 'Hackathons, fests, workshops and more — find what is happening on campus and reserve your seat in seconds.',
  ctaLabel = 'Browse Events',
  ctaTo = '/events',
}) {
  return (
    <section className="hero">
      <div className="hero__backdrop" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1600&q=80"
          alt=""
        />
        <div className="hero__overlay"></div>
      </div>

      {/* Floating ticket-stub shapes — the page's signature motif */}
      <div className="hero__ticket hero__ticket--one" aria-hidden="true">
        <span>HACK</span>
        <span>2026</span>
      </div>
      <div className="hero__ticket hero__ticket--two" aria-hidden="true">
        <span>FEST</span>
        <span>2026</span>
      </div>

      <div className="container hero__content">
        <span className="hero__eyebrow">{eyebrow}</span>
        <h1 className="hero__heading">{heading}</h1>
        <p className="hero__subtitle">{subtitle}</p>
        <div className="hero__actions">
          <Link to={ctaTo} className="btn btn-primary">
            {ctaLabel}
          </Link>
          <Link to="/register" className="btn btn-outline">
            Register Now
          </Link>
        </div>
      </div>

      <svg className="hero__wave" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M0,40 C240,100 480,0 720,40 C960,80 1200,10 1440,50 L1440,100 L0,100 Z"
          fill="var(--color-bg)"
        />
      </svg>
    </section>
  );
}

export default Hero;
