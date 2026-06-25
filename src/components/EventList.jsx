import EventCard from './EventCard';
import './EventList.css';

/**
 * EventList
 * Accepts an `events` array as a prop and renders one EventCard per
 * item via map(). Also handles the "no results" empty state used by
 * the Events page search.
 */
function EventList({ events, emptyMessage = 'No events found. Try a different search.' }) {
  if (!events || events.length === 0) {
    return (
      <div className="event-list__empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
        </svg>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="event-list">
      {events.map((event) => (
        <EventCard
          key={event.id}
          id={event.id}
          title={event.title}
          date={event.date}
          venue={event.venue}
          organizer={event.organizer}
          image={event.image}
          category={event.category}
        />
      ))}
    </div>
  );
}

export default EventList;
