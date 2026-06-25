import { useState } from 'react';
import events from '../data/events';
import './Register.css';

/**
 * Register
 * Controlled registration form. Validates required fields client-side
 * and swaps to a success state on submit (no backend — sample app).
 */
function Register() {
  const initialForm = {
    name: '',
    email: '',
    department: '',
    year: '',
    eventId: '',
  };

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const departments = [
    'Computer Science',
    'Information Technology',
    'Electronics & Communication',
    'Mechanical Engineering',
    'Civil Engineering',
    'Business Administration',
    'Other',
  ];

  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the field's error as soon as the user starts correcting it.
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!formData.department) newErrors.department = 'Please select your department.';
    if (!formData.year) newErrors.year = 'Please select your year.';
    if (!formData.eventId) newErrors.eventId = 'Please select an event.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    // Simulate a short network delay so the loading state is visible.
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  const handleRegisterAnother = () => {
    setFormData(initialForm);
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    const selectedEvent = events.find((e) => e.id === Number(formData.eventId));
    return (
      <div className="page-enter register-page">
        <div className="container register-success">
          <div className="register-success__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1>You're Registered!</h1>
          <p>
            Thanks, <strong>{formData.name}</strong> — a confirmation has been
            sent to <strong>{formData.email}</strong> for
            {selectedEvent ? <> <strong>{selectedEvent.title}</strong></> : ' your selected event'}.
          </p>
          <button className="btn btn-primary" onClick={handleRegisterAnother}>
            Register for Another Event
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter register-page">
      <header className="register-page__header">
        <div className="container">
          <span className="eyebrow">Reserve Your Spot</span>
          <h1>Event Registration</h1>
          <p>Fill in your details below — it only takes a minute.</p>
        </div>
      </header>

      <section className="section">
        <div className="container register-page__body">
          <form className="register-form" onSubmit={handleSubmit} noValidate>
            <div className="register-form__row">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'has-error' : ''}
              />
              {errors.name && <span className="register-form__error">{errors.name}</span>}
            </div>

            <div className="register-form__row">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@college.edu"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'has-error' : ''}
              />
              {errors.email && <span className="register-form__error">{errors.email}</span>}
            </div>

            <div className="register-form__grid">
              <div className="register-form__row">
                <label htmlFor="department">Department</label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className={errors.department ? 'has-error' : ''}
                >
                  <option value="">Select department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <span className="register-form__error">{errors.department}</span>
                )}
              </div>

              <div className="register-form__row">
                <label htmlFor="year">Year of Study</label>
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className={errors.year ? 'has-error' : ''}
                >
                  <option value="">Select year</option>
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
                {errors.year && <span className="register-form__error">{errors.year}</span>}
              </div>
            </div>

            <div className="register-form__row">
              <label htmlFor="eventId">Select Event</label>
              <select
                id="eventId"
                name="eventId"
                value={formData.eventId}
                onChange={handleChange}
                className={errors.eventId ? 'has-error' : ''}
              >
                <option value="">Choose an event</option>
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.title}
                  </option>
                ))}
              </select>
              {errors.eventId && <span className="register-form__error">{errors.eventId}</span>}
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Registration'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Register;
