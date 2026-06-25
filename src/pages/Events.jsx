import { useState, useMemo } from 'react';
import SearchBar from '../components/SearchBar';
import EventList from '../components/EventList';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Events.css';

function Events() {
  const { events, user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return events;
    return events.filter(
      (event) =>
        event.title.toLowerCase().includes(term) ||
        event.category.toLowerCase().includes(term) ||
        event.organizer?.toLowerCase().includes(term) ||
        event.venue?.toLowerCase().includes(term)
    );
  }, [searchTerm, events]);

  return (
    <div className="page-enter events-page">
      <header className="events-page__header">
        <div className="container">
          <span className="eyebrow">All Events</span>
          <h1>Upcoming Campus Events</h1>
          <p>
            Browse every hackathon, workshop, fest and meet scheduled this
            semester — search by title, category or venue to find what you need.
          </p>
          {user?.role === 'staff' && (
            <Link to="/staff/add-event" className="btn btn-primary events-page__add-btn">
              + Add New Event
            </Link>
          )}
        </div>
      </header>

      <section className="section events-page__body">
        <div className="container">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <p className="events-page__count">
            Showing <strong>{filteredEvents.length}</strong> of {events.length} events
          </p>
          {filteredEvents.length === 0 ? (
            <div className="events-page__empty">
              <span>🔍</span>
              <p>No events found for "<strong>{searchTerm}</strong>". Try a different keyword.</p>
            </div>
          ) : (
            <EventList events={filteredEvents} />
          )}
        </div>
      </section>
    </div>
  );
}

export default Events;
