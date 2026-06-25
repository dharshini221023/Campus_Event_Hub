import { Link } from 'react-router-dom';
import './EventCard.css';

/**
 * EventCard
 * Pure presentational component — receives all event data via props
 * and renders nothing it wasn't given. Used by EventList and the
 * featured events section on Home.
 */
function EventCard({ id, title, date, venue, organizer, image, category }) {
  const formattedDate = new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <article className="event-card">
      <div className="event-card__image-wrap">
        <img src={image} alt={title} className="event-card__image" loading="lazy" />
        <span className="event-card__category">{category}</span>
      </div>

      {/* Perforated divider — the ticket-stub signature motif */}
      <div className="event-card__perforation">
        <span className="event-card__notch event-card__notch--left"></span>
        <span className="event-card__dashes"></span>
        <span className="event-card__notch event-card__notch--right"></span>
      </div>

      <div className="event-card__body">
        <h3 className="event-card__title">{title}</h3>

        <ul className="event-card__meta">
          <li>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="5" width="18" height="16" rx="3" />
              <path d="M16 3v4M8 3v4M3 10h18" />
            </svg>
            {formattedDate}
          </li>
          <li>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 21s-7-6.2-7-11.5A7 7 0 0119 9.5C19 14.8 12 21 12 21z" />
              <circle cx="12" cy="9.5" r="2.4" />
            </svg>
            {venue}
          </li>
          <li>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="8" r="3.2" />
              <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" />
            </svg>
            {organizer}
          </li>
        </ul>

        <Link to={`/events/${id}`} className="btn btn-secondary btn-block event-card__cta">
          View Details
        </Link>
      </div>
    </article>
  );
}

export default EventCard;
