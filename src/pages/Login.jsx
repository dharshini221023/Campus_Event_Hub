import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const DEPARTMENTS = [
  // Engineering — Computer & IT
  'Computer Science & Engineering (CSE)',
  'Artificial Intelligence & Machine Learning (AI&ML)',
  'Artificial Intelligence & Data Science (AI&DS)',
  'Computer Science & Business Systems (CSBS)',
  'Information Technology (IT)',
  'Cyber Security',
  'Software Engineering',
  // Engineering — Electronics
  'Electronics & Communication Engineering (ECE)',
  'Electrical & Electronics Engineering (EEE)',
  'Electrical Engineering (EE)',
  'Electronics & Instrumentation Engineering (EIE)',
  'Biomedical Engineering',
  // Engineering — Mechanical & Related
  'Mechanical Engineering',
  'Automobile Engineering',
  'Aeronautical Engineering',
  'Marine Engineering',
  'Production Engineering',
  'Manufacturing Engineering',
  'Mechatronics Engineering',
  'Robotics & Automation',
  // Engineering — Civil & Construction
  'Civil Engineering',
  'Construction Engineering & Management',
  'Environmental Engineering',
  // Engineering — Chemical & Bio
  'Chemical Engineering',
  'Bio-Technology',
  'Food Technology',
  'Pharmaceutical Technology',
  'Petrochemical Engineering',
  // Engineering — Textile & Materials
  'Textile Technology',
  'Fashion Technology',
  'Leather Technology',
  'Metallurgical Engineering',
  'Materials Science & Engineering',
  // Management & Science
  'MBA / Management',
  'MCA / Computer Applications',
  'Physics Department',
  'Chemistry Department',
  'Mathematics Department',
  'English Department',
  'Architecture',
  'Other',
];

function Login() {
  const { signup, login } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState(null);
  const [tab, setTab] = useState('login');
  const [form, setForm] = useState({
    name: '', email: '', rollNo: '', password: '', confirmPassword: '', department: '',
  });
  const [error, setError] = useState('');
  const [showPwd, setShowPwd] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const reset = () => {
    setForm({ name: '', email: '', rollNo: '', password: '', confirmPassword: '', department: '' });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (tab === 'signup') {
      if (!form.name.trim()) return setError('Full name is required.');
      if (!form.email.trim() || !form.email.includes('@')) return setError('Enter a valid email.');
      if (role === 'student') {
        if (!form.rollNo.trim()) return setError('Roll Number is required.');
        if (!/^[A-Za-z0-9]+$/.test(form.rollNo.trim())) return setError('Roll Number should be alphanumeric.');
      }
      if (form.password.length < 6) return setError('Password must be at least 6 characters.');
      if (form.password !== form.confirmPassword) return setError('Passwords do not match.');
      if (role === 'staff' && !form.department) return setError('Please select your department.');

      const result = signup({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        rollNo: role === 'student' ? form.rollNo.trim().toUpperCase() : undefined,
        password: form.password,
        role,
        department: form.department,
      });

      if (result.error) return setError(result.error);
      navigate(role === 'staff' ? '/staff/add-event' : '/');
    } else {
      if (!form.email.trim()) return setError('Enter your email.');
      if (role === 'student' && !form.rollNo.trim()) return setError('Enter your Roll Number.');
      if (!form.password) return setError('Enter your password.');

      const result = login(
        form.email.trim().toLowerCase(),
        form.password,
        role,
        role === 'student' ? form.rollNo.trim().toUpperCase() : undefined,
      );
      if (result.error) return setError(result.error);
      navigate(role === 'staff' ? '/staff/add-event' : '/');
    }
  };

  const switchTab = (t) => { setTab(t); reset(); };

  return (
    <div className="login-page page-enter">
      <div className="login-page__bg" aria-hidden="true" />

      <div className="login-page__container">
        <div className="login-page__header">
          <span className="login-page__logo-mark">CE</span>
          <h1>Campus Event Hub</h1>
          <p>Your gateway to every campus event</p>
        </div>

        {!role ? (
          <div className="login-role-select">
            <p className="login-role-select__label">I am a…</p>
            <div className="login-role-cards">
              <button className="login-role-card login-role-card--student" onClick={() => { setRole('student'); reset(); }}>
                <div className="login-role-card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422A12.083 12.083 0 0122 17.25c0 .386-.031.764-.09 1.133A11.98 11.98 0 0012 20.25a11.98 11.98 0 00-9.91-1.867A11.96 11.96 0 012 17.25c0-2.089.545-4.051 1.507-5.753L12 14z" />
                    <path d="M12 14v8" />
                  </svg>
                </div>
                <strong>Student</strong>
                <span>Browse &amp; register for events</span>
              </button>

              <button className="login-role-card login-role-card--staff" onClick={() => { setRole('staff'); reset(); }}>
                <div className="login-role-card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                    <path d="M16 3l2 2-6 6-3-3 2-2 1 1z" />
                  </svg>
                </div>
                <strong>Staff</strong>
                <span>Create &amp; manage events</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="login-tabs">
              <button className={`login-tab ${tab === 'login' ? 'login-tab--active' : ''}`} onClick={() => switchTab('login')}>
                Login
              </button>
              <button className={`login-tab ${tab === 'signup' ? 'login-tab--active' : ''}`} onClick={() => switchTab('signup')}>
                Sign Up
              </button>
            </div>

            <div className={`login-form__badge login-form__badge--${role}`}>
              {role === 'student' ? '🎓 Student' : '🏫 Staff'} — {tab === 'login' ? 'Welcome back' : 'Create account'}
            </div>

            <form className="login-form" onSubmit={handleSubmit} noValidate>
              {tab === 'signup' && (
                <div className="login-form__field">
                  <label htmlFor="f-name">Full Name *</label>
                  <input id="f-name" type="text" placeholder={role === 'staff' ? 'e.g. Prof. Sharma' : 'e.g. Ananya Rao'}
                    value={form.name} onChange={(e) => set('name', e.target.value)} autoFocus />
                </div>
              )}

              <div className="login-form__field">
                <label htmlFor="f-email">Email Address *</label>
                <input id="f-email" type="email" placeholder="you@college.edu"
                  value={form.email} onChange={(e) => set('email', e.target.value)}
                  autoFocus={tab === 'login'} />
              </div>

              {/* Roll No — for students on both login & signup */}
              {role === 'student' && (
                <div className="login-form__field">
                  <label htmlFor="f-roll">Roll Number *</label>
                  <input id="f-roll" type="text" placeholder="e.g. 21CS001"
                    value={form.rollNo} onChange={(e) => set('rollNo', e.target.value.toUpperCase())}
                    style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }} />
                </div>
              )}

              {tab === 'signup' && role === 'staff' && (
                <div className="login-form__field">
                  <label htmlFor="f-dept">Department *</label>
                  <select id="f-dept" value={form.department} onChange={(e) => set('department', e.target.value)}>
                    <option value="">— Select your department —</option>
                    {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              )}

              <div className="login-form__field">
                <label htmlFor="f-pwd">Password *</label>
                <div className="login-form__pwd-wrap">
                  <input id="f-pwd" type={showPwd ? 'text' : 'password'}
                    placeholder={tab === 'signup' ? 'Min. 6 characters' : 'Your password'}
                    value={form.password} onChange={(e) => set('password', e.target.value)} />
                  <button type="button" className="login-form__pwd-toggle" onClick={() => setShowPwd(s => !s)}>
                    {showPwd ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              {tab === 'signup' && (
                <div className="login-form__field">
                  <label htmlFor="f-cpwd">Confirm Password *</label>
                  <input id="f-cpwd" type={showPwd ? 'text' : 'password'} placeholder="Re-enter password"
                    value={form.confirmPassword} onChange={(e) => set('confirmPassword', e.target.value)} />
                </div>
              )}

              {error && <p className="login-form__error">{error}</p>}

              <button type="submit" className="btn btn-primary login-form__submit">
                {tab === 'signup'
                  ? (role === 'student' ? 'Create Account & Browse Events →' : 'Create Account & Continue →')
                  : (role === 'student' ? 'Login & Browse Events →' : 'Login to Dashboard →')}
              </button>
            </form>

            <button type="button" className="login-form__back"
              onClick={() => { setRole(null); reset(); setTab('login'); }}>
              ← Choose a different role
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
