import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './EventDetails.css';

function EventDetails() {
  const { id } = useParams();
  const { events, user, registerForEvent, isRegistered } = useAuth();
  const navigate = useNavigate();

  const event = events.find((e) => String(e.id) === String(id));

  if (!event) return <Navigate to="/404" replace />;

  const formattedDate = new Date(event.date).toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  const seatsLeft = event.seats - (event.registered || 0);
  const percentFull = Math.round(((event.registered || 0) / event.seats) * 100);
  const alreadyRegistered = isRegistered(event.id);

  const handleRegister = () => {
    if (!user) { navigate('/login'); return; }
    if (user.role === 'staff') return;
    registerForEvent(event.id);
  };

  return (
    <div className="page-enter event-details">
      <div className="event-details__hero">
        <img src={event.image} alt={event.title} />
        <div className="event-details__hero-overlay"></div>
        <div className="container event-details__hero-content">
          <Link to="/events" className="event-details__back">&larr; Back to Events</Link>
          <span className="event-details__category">{event.category}</span>
          <h1>{event.title}</h1>
        </div>
      </div>

      <div className="container event-details__layout">
        <div className="event-details__main">
          <section className="event-details__card">
            <h2>About This Event</h2>
            <p>{event.description}</p>
          </section>

          {event.highlights && event.highlights.length > 0 && (
            <section className="event-details__card">
              <h2>Event Highlights</h2>
              <ul className="event-details__highlights">
                {event.highlights.map((item) => (
                  <li key={item}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="event-details__sidebar">
          <div className="event-details__info-card">
            <ul className="event-details__info-list">
              <li>
                <span className="event-details__info-label">Date</span>
                <span className="event-details__info-value">{formattedDate}</span>
              </li>
              <li>
                <span className="event-details__info-label">Time</span>
                <span className="event-details__info-value">{event.time}</span>
              </li>
              <li>
                <span className="event-details__info-label">Venue</span>
                <span className="event-details__info-value">{event.venue}</span>
              </li>
              <li>
                <span className="event-details__info-label">Organizer</span>
                <span className="event-details__info-value">{event.organizer}</span>
              </li>
            </ul>

            <div className="event-details__seats">
              <div className="event-details__seats-bar">
                <div className="event-details__seats-fill" style={{ width: `${Math.min(percentFull, 100)}%` }}></div>
              </div>
              <p><strong>{seatsLeft}</strong> seats left out of {event.seats}</p>
            </div>

            {user?.role === 'staff' ? (
              <div className="event-details__staff-note">
                Staff cannot register for events.
              </div>
            ) : alreadyRegistered ? (
              <div className="event-details__registered-badge">
                ✓ You're registered for this event!
              </div>
            ) : seatsLeft <= 0 ? (
              <div className="event-details__full-badge">
                Event is Full
              </div>
            ) : (
              <button
                className="btn btn-primary btn-block"
                onClick={handleRegister}
              >
                {user ? 'Register for this Event' : 'Login to Register'}
              </button>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default EventDetails;
