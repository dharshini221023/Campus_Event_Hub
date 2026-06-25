import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, CATEGORY_IMAGES } from '../context/AuthContext';
import './AddEvent.css';

const CATEGORIES = ['Hackathon', 'Workshop', 'Competition', 'Cultural', 'Sports', 'Summit', 'Training', 'Symposium', 'Seminar', 'Other'];

function AddEvent() {
  const { user, addEvent } = useAuth();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    title: '',
    category: 'Workshop',
    date: '',
    time: '',
    venue: '',
    seats: '',
    description: '',
    highlights: ['', '', ''],
  });

  const [errors, setErrors] = useState({});

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const setHighlight = (i, val) => {
    const h = [...form.highlights];
    h[i] = val;
    setForm((f) => ({ ...f, highlights: h }));
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Event title is required.';
    if (!form.date) e.date = 'Date is required.';
    if (!form.time.trim()) e.time = 'Time is required.';
    if (!form.venue.trim()) e.venue = 'Venue is required.';
    if (!form.seats || Number(form.seats) < 1) e.seats = 'Enter a valid seat count.';
    if (!form.description.trim()) e.description = 'Description is required.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    addEvent({
      title: form.title.trim(),
      category: form.category,
      date: form.date,
      time: form.time.trim(),
      venue: form.venue.trim(),
      seats: Number(form.seats),
      description: form.description.trim(),
      highlights: form.highlights.filter(Boolean),
    });
    setSubmitted(true);
  };

  const previewImage = CATEGORY_IMAGES[form.category] || CATEGORY_IMAGES.Other;

  if (submitted) {
    return (
      <div className="add-event-page page-enter">
        <div className="add-event-success">
          <div className="add-event-success__icon">✓</div>
          <h2>Event Published!</h2>
          <p>Your event is now live and visible to all students when they search for events.</p>
          <div className="add-event-success__actions">
            <button className="btn btn-primary" onClick={() => {
              setSubmitted(false);
              setForm({ title:'', category:'Workshop', date:'', time:'', venue:'', seats:'', description:'', highlights:['','',''] });
              setErrors({});
            }}>
              Add Another Event
            </button>
            <button className="btn btn-outline" onClick={() => navigate('/events')}>
              View All Events
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="add-event-page page-enter">
      <div className="add-event-page__header">
        <div className="container">
          <span className="eyebrow">Staff Dashboard</span>
          <h1>Add New Event</h1>
          <div className="add-event-page__header-meta">
            <span className="add-event-staff-chip">
              <span className="add-event-staff-dot" />
              {user?.name}
            </span>
            {user?.department && (
              <span className="add-event-dept-chip">🏛️ {user.department}</span>
            )}
          </div>
        </div>
      </div>

      <div className="container add-event-page__body">
        <form className="add-event-form" onSubmit={handleSubmit} noValidate>

          {/* Image Preview Card */}
          <div className="add-event-preview">
            <div className="add-event-preview__img-wrap">
              <img src={previewImage} alt={`${form.category} event preview`} />
              <div className="add-event-preview__overlay">
                <span className="add-event-preview__label">Auto-selected image for <strong>{form.category}</strong></span>
              </div>
            </div>
            <p className="add-event-preview__hint">
              📸 The image updates automatically based on the category you choose below.
            </p>
          </div>

          <div className="add-event-form__section">
            <h3>Basic Details</h3>

            <div className={`add-event-form__field add-event-form__field--full ${errors.title ? 'has-error' : ''}`}>
              <label htmlFor="ae-title">Event Title *</label>
              <input id="ae-title" type="text" placeholder="e.g. National Tech Symposium 2026"
                value={form.title} onChange={(e) => set('title', e.target.value)} />
              {errors.title && <span className="field-error">{errors.title}</span>}
            </div>

            <div className="add-event-form__row add-event-form__row--2col">
              <div className="add-event-form__field">
                <label htmlFor="ae-category">Category *</label>
                <select id="ae-category" value={form.category} onChange={(e) => set('category', e.target.value)}>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
                <span className="add-event-form__hint">Image auto-updates with category</span>
              </div>
              <div className={`add-event-form__field ${errors.seats ? 'has-error' : ''}`}>
                <label htmlFor="ae-seats">Total Seats *</label>
                <input id="ae-seats" type="number" min="1" placeholder="e.g. 100"
                  value={form.seats} onChange={(e) => set('seats', e.target.value)} />
                {errors.seats && <span className="field-error">{errors.seats}</span>}
              </div>
            </div>

            <div className="add-event-form__row add-event-form__row--2col">
              <div className={`add-event-form__field ${errors.date ? 'has-error' : ''}`}>
                <label htmlFor="ae-date">Date *</label>
                <input id="ae-date" type="date" value={form.date} onChange={(e) => set('date', e.target.value)} />
                {errors.date && <span className="field-error">{errors.date}</span>}
              </div>
              <div className={`add-event-form__field ${errors.time ? 'has-error' : ''}`}>
                <label htmlFor="ae-time">Time *</label>
                <input id="ae-time" type="text" placeholder="e.g. 9:00 AM – 5:00 PM"
                  value={form.time} onChange={(e) => set('time', e.target.value)} />
                {errors.time && <span className="field-error">{errors.time}</span>}
              </div>
            </div>

            <div className={`add-event-form__field add-event-form__field--full ${errors.venue ? 'has-error' : ''}`}>
              <label htmlFor="ae-venue">Venue *</label>
              <input id="ae-venue" type="text" placeholder="e.g. Main Auditorium, Admin Block"
                value={form.venue} onChange={(e) => set('venue', e.target.value)} />
              {errors.venue && <span className="field-error">{errors.venue}</span>}
            </div>
          </div>

          <div className="add-event-form__section">
            <h3>Description</h3>
            <div className={`add-event-form__field add-event-form__field--full ${errors.description ? 'has-error' : ''}`}>
              <label htmlFor="ae-desc">What's this event about? *</label>
              <textarea id="ae-desc" rows={5} placeholder="Describe the event, what students will experience, who should attend..."
                value={form.description} onChange={(e) => set('description', e.target.value)} />
              {errors.description && <span className="field-error">{errors.description}</span>}
            </div>
          </div>

          <div className="add-event-form__section">
            <h3>Highlights <span className="optional-label">(optional — up to 3)</span></h3>
            {form.highlights.map((h, i) => (
              <div className="add-event-form__field add-event-form__field--full" key={i}>
                <input type="text" placeholder={`Highlight ${i + 1} — e.g. "₹20,000 prize pool"`}
                  value={h} onChange={(e) => setHighlight(i, e.target.value)} />
              </div>
            ))}
          </div>

          <div className="add-event-form__actions">
            <button type="submit" className="btn btn-primary">Publish Event →</button>
            <button type="button" className="btn btn-outline" onClick={() => navigate('/events')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEvent;
