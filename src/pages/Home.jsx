import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import EventList from '../components/EventList';
import { useAuth } from '../context/AuthContext';
import './Home.css';

function Home() {
  const { events, user, isRegistered } = useAuth();
  const featuredEvents = events.slice(0, 4);
  const revealRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );
    // small delay so elements are mounted and positioned
    const timer = setTimeout(() => {
      revealRefs.current.forEach((el) => el && observer.observe(el));
    }, 80);
    return () => { clearTimeout(timer); observer.disconnect(); };
  }, []);

  const addRevealRef = (el) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  const stats = [
    { label: 'Total Events', value: `${events.length}+`, icon: 'calendar' },
    { label: 'Registered Students', value: '6,200+', icon: 'users' },
    { label: 'Active Organizers', value: '32', icon: 'badge' },
  ];

  const categories = [
    { icon: '💻', label: 'Hackathons', color: '#7c3aed' },
    { icon: '🎨', label: 'Cultural', color: '#ec4899' },
    { icon: '🏆', label: 'Competitions', color: '#f59e0b' },
    { icon: '📚', label: 'Workshops', color: '#3b82f6' },
    { icon: '⚽', label: 'Sports', color: '#10b981' },
    { icon: '🚀', label: 'Summits', color: '#ef4444' },
  ];

  const features = [
    {
      icon: '🔍',
      title: 'Discover Every Event',
      desc: 'One platform for hackathons, cultural fests, workshops, sports, seminars and more. No more missing out because you didn\'t see the WhatsApp message.',
      color: '#7c3aed',
    },
    {
      icon: '⚡',
      title: 'Register in Seconds',
      desc: 'Sign up for any event with a single click. No forms, no queues, no confusion — your seat is confirmed instantly.',
      color: '#ec4899',
    },
    {
      icon: '🎯',
      title: 'Personalised Dashboard',
      desc: 'Track every event you\'ve registered for, all in one place. Never double-book or forget an event date again.',
      color: '#f59e0b',
    },
    {
      icon: '🏫',
      title: 'For Staff Too',
      desc: 'Faculty and organisers can publish events in minutes. Reach every student on campus instantly — no posters needed.',
      color: '#3b82f6',
    },
    {
      icon: '📅',
      title: 'Always Up-to-Date',
      desc: 'Live seat counts, dates and venues updated in real time. You always see the latest information before you register.',
      color: '#10b981',
    },
    {
      icon: '🔒',
      title: 'Secure & Simple Login',
      desc: 'Students log in with their college email and roll number. Staff verify via department credentials. Safe and straightforward.',
      color: '#ef4444',
    },
  ];

  const testimonials = [
    { quote: 'Campus Event Hub made it so easy to find the hackathon and register in under a minute. No more chasing WhatsApp forwards!', name: 'Ananya Rao', role: 'Final Year, Computer Science' },
    { quote: 'Listing our cultural fest here meant way more turnout than last year. The event page looked genuinely professional.', name: 'Rahul Mehta', role: 'Cultural Council Lead' },
    { quote: 'I love that I can search events by what I actually care about. Saved me from missing the AI workshop sign-up.', name: 'Sneha Iyer', role: 'Second Year, Data Science' },
  ];

  const statIcons = {
    calendar: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </svg>
    ),
    users: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="9" cy="8" r="3.2" />
        <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
        <circle cx="17" cy="9" r="2.4" />
        <path d="M15.5 13.2c2.6.5 4 2.3 4 5.3" />
      </svg>
    ),
    badge: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="9" r="5.5" />
        <path d="M8.5 13.8L7 21l5-2.6 5 2.6-1.5-7.2" />
      </svg>
    ),
  };

  return (
    <div className="page-enter">

      {/* ── HERO ── */}
      <section className="home-hero">
        <div className="home-hero__bg" aria-hidden="true">
          <div className="home-hero__orb home-hero__orb--1" />
          <div className="home-hero__orb home-hero__orb--2" />
          <div className="home-hero__orb home-hero__orb--3" />
          <div className="home-hero__grid" />
        </div>

        <div className="container home-hero__content">
          <div className="home-hero__badge">
            <span className="home-hero__badge-dot" />
            Live events this semester
          </div>
          <h1 className="home-hero__heading">
            Your campus.<br />
            <span className="home-hero__heading-accent">Your events.</span>
          </h1>
          <p className="home-hero__sub">
            Discover hackathons, workshops, cultural fests and more —
            all in one place. Register in seconds, never miss a moment.
          </p>

          <div className="home-hero__actions">
            {user ? (
              user.role === 'staff' ? (
                <>
                  <Link to="/staff/add-event" className="btn btn-primary home-hero__btn">
                    + Add New Event
                  </Link>
                  <Link to="/events" className="btn btn-outline home-hero__btn home-hero__btn--outline">
                    View All Events
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/events" className="btn btn-primary home-hero__btn">
                    Browse Events →
                  </Link>
                  <span className="home-hero__welcome">Welcome back, {user.name}! 👋</span>
                </>
              )
            ) : (
              <>
                <Link to="/login" className="btn btn-primary home-hero__btn">
                  Get Started →
                </Link>
                <Link to="/events" className="btn btn-outline home-hero__btn home-hero__btn--outline">
                  Browse Events
                </Link>
              </>
            )}
          </div>

          <div className="home-hero__floating-cards" aria-hidden="true">
            <div className="home-hero__float-card home-hero__float-card--1">
              <span>🏆</span> Hackathon
            </div>
            <div className="home-hero__float-card home-hero__float-card--2">
              <span>🎭</span> Cultural Fest
            </div>
            <div className="home-hero__float-card home-hero__float-card--3">
              <span>💡</span> Workshop
            </div>
          </div>
        </div>

        <svg className="home-hero__wave" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,40 C240,100 480,0 720,40 C960,80 1200,10 1440,50 L1440,100 L0,100 Z" fill="var(--color-bg)" />
        </svg>

        <div className="home-hero__scroll-hint" aria-hidden="true">
          <span>Scroll</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* ── WHY CAMPUS EVENT HUB — fills the white gap below the hero wave ── */}
      <section className="home-why">
        <div className="container reveal" ref={addRevealRef}>
          <div className="home-why__intro">
            <span className="eyebrow">Why Campus Event Hub?</span>
            <h2 className="home-why__heading">
              Everything campus. <span className="home-why__heading-pop">One platform.</span>
            </h2>
            <p className="home-why__sub">
              From last-minute hackathon sign-ups to sold-out cultural fests — Campus Event Hub is the single destination where students discover, register, and never miss a beat. No more chasing posters, WhatsApp forwards, or Google Forms.
            </p>
          </div>

          <div className="home-why__grid">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="home-why__card reveal"
                ref={addRevealRef}
                style={{ animationDelay: `${i * 0.08}s`, '--card-color': f.color }}
              >
                <div className="home-why__card-icon" style={{ background: `${f.color}18`, color: f.color }}>
                  {f.icon}
                </div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="home-why__banner">
            <div className="home-why__banner-text">
              <span className="home-why__banner-stat">6,200+</span>
              <span>students already registered</span>
            </div>
            <div className="home-why__banner-divider" />
            <div className="home-why__banner-text">
              <span className="home-why__banner-stat">32</span>
              <span>active event organisers</span>
            </div>
            <div className="home-why__banner-divider" />
            <div className="home-why__banner-text">
              <span className="home-why__banner-stat">100%</span>
              <span>free for every student</span>
            </div>
            <Link to="/login" className="btn btn-primary home-why__banner-cta">
              Join Now — It's Free →
            </Link>
          </div>
        </div>
      </section>

      {/* ── MY REGISTERED EVENTS (only for logged-in students) ── */}
      {user && user.role === 'student' && (
        <section className="section">
          <div className="container reveal" ref={addRevealRef}>
            <div className="section-heading">
              <span className="eyebrow">Your Journey</span>
              <h2>My Registered Events 🎟️</h2>
              <p>Here are all the events you've signed up for. Never miss a moment!</p>
            </div>
            {(() => {
              const myEvents = events.filter(e => isRegistered(e.id));
              if (myEvents.length === 0) return (
                <div className="home-my-events">
                  <p className="home-my-events__empty">
                    🎯 You haven't registered for any events yet.<br />
                    <Link to="/events" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-flex' }}>
                      Browse Events →
                    </Link>
                  </p>
                </div>
              );
              return <EventList events={myEvents} />;
            })()}
          </div>
        </section>
      )}

      {/* ── LOGIN PROMPT (only if not logged in) ── */}
      {!user && (
        <section className="home-login-prompt">
          <div className="container home-login-prompt__inner reveal" ref={addRevealRef}>
            <div className="home-login-card home-login-card--student">
              <div className="home-login-card__icon">🎓</div>
              <h3>I'm a Student</h3>
              <p>Discover events, register your spot, and track what you've joined — all in one dashboard.</p>
              <Link to="/login" className="btn btn-primary">
                Student Login →
              </Link>
            </div>
            <div className="home-login-divider">or</div>
            <div className="home-login-card home-login-card--staff">
              <div className="home-login-card__icon">🏫</div>
              <h3>I'm a Staff Member</h3>
              <p>Create and publish events for your department. Students can find and register instantly.</p>
              <Link to="/login" className="btn btn-primary home-login-card--staff-btn">
                Staff Login →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── CATEGORIES ── */}
      <section className="section home-categories">
        <div className="container reveal" ref={addRevealRef}>
          <div className="section-heading">
            <span className="eyebrow">Explore by Type</span>
            <h2>What kind of event are you looking for?</h2>
          </div>
          <div className="home-categories__grid">
            {categories.map((cat) => (
              <Link to="/events" key={cat.label} className="home-cat-chip" style={{ '--chip-color': cat.color }}>
                <span className="home-cat-chip__icon">{cat.icon}</span>
                <span>{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED EVENTS ── */}
      <section className="section">
        <div className="container reveal" ref={addRevealRef}>
          <div className="section-heading">
            <span className="eyebrow">Happening Soon</span>
            <h2>Featured Events</h2>
            <p>A handful of the most popular events students are signing up for right now.</p>
          </div>
          <EventList events={featuredEvents} />
          <div className="home__view-all">
            <Link to="/events" className="btn btn-primary">View All Events</Link>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="section home__stats-section">
        <div className="container reveal" ref={addRevealRef}>
          <div className="home__stats">
            {stats.map((stat) => (
              <div className="stat-card" key={stat.label}>
                <div className="stat-card__icon">{statIcons[stat.icon]}</div>
                <span className="stat-card__value">{stat.value}</span>
                <span className="stat-card__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section home-how">
        <div className="container reveal" ref={addRevealRef}>
          <div className="section-heading">
            <span className="eyebrow">Simple Process</span>
            <h2>How it works</h2>
          </div>
          <div className="home-how__steps">
            <div className="home-how__step">
              <div className="home-how__step-num">1</div>
              <h4>Login as Student or Staff</h4>
              <p>Choose your role and sign in to access the right features for you.</p>
            </div>
            <div className="home-how__connector" aria-hidden="true" />
            <div className="home-how__step">
              <div className="home-how__step-num">2</div>
              <h4>Browse or Add Events</h4>
              <p>Students explore and search. Staff create and publish events instantly.</p>
            </div>
            <div className="home-how__connector" aria-hidden="true" />
            <div className="home-how__step">
              <div className="home-how__step-num">3</div>
              <h4>Register & Attend</h4>
              <p>Students register in one click. Your seat is confirmed immediately.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section">
        <div className="container reveal" ref={addRevealRef}>
          <div className="section-heading">
            <span className="eyebrow">From The Community</span>
            <h2>What Students Are Saying</h2>
          </div>
          <div className="testimonials">
            {testimonials.map((t) => (
              <figure className="testimonial-card" key={t.name}>
                <svg className="testimonial-card__quote" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.2 5.6C4.3 7.4 3 9.9 3 12.9c0 2.5 1.6 4.1 3.6 4.1 1.8 0 3.1-1.3 3.1-3 0-1.6-1.1-2.8-2.6-2.9.2-1.7 1.5-3.4 3.4-4.4L7.2 5.6zm9.6 0c-2.9 1.8-4.2 4.3-4.2 7.3 0 2.5 1.6 4.1 3.6 4.1 1.8 0 3.1-1.3 3.1-3 0-1.6-1.1-2.8-2.6-2.9.2-1.7 1.5-3.4 3.4-4.4l-3.3-1.1z" />
                </svg>
                <blockquote>{t.quote}</blockquote>
                <figcaption>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
