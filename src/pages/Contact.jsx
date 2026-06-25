import { useState } from 'react';
import './Contact.css';

/**
 * Contact
 * Contact form (controlled inputs) plus static contact info cards
 * and an embedded map placeholder.
 */
function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setFormData({ name: '', email: '', message: '' });
  };

  const infoCards = [
    {
      label: 'Email Us',
      value: 'events@campushub.edu',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="5" width="18" height="14" rx="2.5" />
          <path d="M4 7l8 6 8-6" />
        </svg>
      ),
    },
    {
      label: 'Call Us',
      value: '+91 98765 43210',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4.5 4h3.4l1.6 4.4-2 1.6a13 13 0 006.5 6.5l1.6-2 4.4 1.6V19c0 1-.8 1.8-1.8 1.8C10.6 20.8 3.2 13.4 3.2 5.8 3.2 4.8 4 4 4.5 4z" />
        </svg>
      ),
    },
    {
      label: 'Visit Us',
      value: 'Student Activity Center, Main Campus',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 21s-7-6.2-7-11.5A7 7 0 0119 9.5C19 14.8 12 21 12 21z" />
          <circle cx="12" cy="9.5" r="2.4" />
        </svg>
      ),
    },
  ];

  return (
    <div className="page-enter contact-page">
      <header className="contact-page__header">
        <div className="container">
          <span className="eyebrow">Get In Touch</span>
          <h1>Contact Campus Event Hub</h1>
          <p>Have a question about an event, or want to list your own? Reach out below.</p>
        </div>
      </header>

      <section className="section">
        <div className="container contact-page__grid">
          <div className="contact-page__form-col">
            {sent && (
              <div className="contact-page__success">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Thanks! Your message has been sent — we'll reply within 1-2 business days.
              </div>
            )}
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form__row">
                <label htmlFor="contact-name">Your Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Jane Doe"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="contact-form__row">
                <label htmlFor="contact-email">Your Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@college.edu"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="contact-form__row">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="How can we help?"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Send Message
              </button>
            </form>
          </div>

          <div className="contact-page__info-col">
            {infoCards.map((card) => (
              <div className="contact-info-card" key={card.label}>
                <div className="contact-info-card__icon">{card.icon}</div>
                <div>
                  <span className="contact-info-card__label">{card.label}</span>
                  <span className="contact-info-card__value">{card.value}</span>
                </div>
              </div>
            ))}

            {/* Embedded map placeholder */}
            <div className="contact-map">
              <div className="contact-map__placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 21s-7-6.2-7-11.5A7 7 0 0119 9.5C19 14.8 12 21 12 21z" />
                  <circle cx="12" cy="9.5" r="2.4" />
                </svg>
                <p>Campus Map</p>
                <span>Student Activity Center, Main Campus</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
