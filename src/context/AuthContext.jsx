import { createContext, useContext, useEffect, useState } from 'react';
import defaultEvents from '../data/events';

const AuthContext = createContext(null);

// Category → Unsplash image map
export const CATEGORY_IMAGES = {
  Hackathon: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&q=80',
  Workshop: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
  Competition: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&q=80',
  Cultural: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=900&q=80',
  Sports: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&q=80',
  Summit: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=80',
  Training: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=80',
  Symposium: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80',
  Seminar: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=900&q=80',
  Other: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=900&q=80',
};

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem('ceh_users') || '{}'));
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('ceh_user') || 'null'));
  const [events, setEvents] = useState(defaultEvents);
  const [registrations, setRegistrations] = useState(() => JSON.parse(localStorage.getItem('ceh_registrations') || '{}'));

  useEffect(() => { localStorage.setItem('ceh_users', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('ceh_user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('ceh_registrations', JSON.stringify(registrations)); }, [registrations]);

  const signup = (data) => {
    // data: { name, email, password, role, department?, rollNo? }
    if (users[data.email]) return { error: 'An account with this email already exists.' };
    if (data.role === 'student' && data.rollNo) {
      // check rollNo uniqueness
      const taken = Object.values(users).some(u => u.rollNo === data.rollNo);
      if (taken) return { error: 'This Roll Number is already registered.' };
    }
    const newUser = { ...data };
    setUsers((prev) => ({ ...prev, [data.email]: newUser }));
    setUser({ ...newUser });
    return { success: true };
  };

  const login = (email, password, role, rollNo) => {
    const found = users[email];
    if (!found) return { error: 'No account found. Please sign up first.' };
    if (found.role !== role) return { error: `This account is registered as a ${found.role}, not ${role}.` };
    if (found.password !== password) return { error: 'Incorrect password.' };
    // For students, also verify rollNo matches
    if (role === 'student' && rollNo && found.rollNo && found.rollNo !== rollNo.trim()) {
      return { error: 'Roll number does not match our records.' };
    }
    setUser({ ...found });
    return { success: true };
  };

  const logout = () => setUser(null);

  const addEvent = (eventData) => {
    const image = CATEGORY_IMAGES[eventData.category] || CATEGORY_IMAGES.Other;
    const newEvent = {
      ...eventData,
      id: Date.now(),
      registered: 0,
      organizer: user?.name || 'Staff',
      department: user?.department || '',
      image,
    };
    setEvents((prev) => [newEvent, ...prev]);
    return newEvent;
  };

  const registerForEvent = (eventId) => {
    if (!user || user.role !== 'student') return false;
    const key = `${eventId}`;
    const already = (registrations[key] || []).includes(user.email);
    if (already) return false;
    setRegistrations((prev) => ({ ...prev, [key]: [...(prev[key] || []), user.email] }));
    setEvents((prev) =>
      prev.map((e) => e.id === eventId ? { ...e, registered: (e.registered || 0) + 1 } : e)
    );
    return true;
  };

  const isRegistered = (eventId) => {
    if (!user) return false;
    return (registrations[`${eventId}`] || []).includes(user.email);
  };

  return (
    <AuthContext.Provider value={{ user, events, registrations, signup, login, logout, addEvent, registerForEvent, isRegistered }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
