// src/data/events.js
// Centralized sample data for Campus Event Hub.
// In a real app this would come from an API — kept here as a single
// source of truth so components stay purely presentational (props in, UI out).

const events = [
  {
    id: 1,
    title: "CodeStorm Hackathon 2026",
    category: "Hackathon",
    date: "2026-07-18",
    time: "9:00 AM – 9:00 PM",
    venue: "Innovation Lab, Block C",
    organizer: "Computer Science Society",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&q=80",
    seats: 120,
    registered: 87,
    description:
      "A 12-hour build sprint where teams of up to four race to ship a working prototype around this year's theme: 'Tech for Campus Life'. Mentors from local startups will be on-site, and the top three teams split a cash prize pool. Bring your own laptop — power strips and Wi-Fi are provided, plus a steady stream of pizza and coffee.",
    highlights: [
      "₹50,000 prize pool across 3 winning teams",
      "Free meals, snacks & energy drinks all day",
      "Mentorship slots with industry engineers",
      "Open to all years, teams of 1–4",
    ],
  },
  {
    id: 2,
    title: "Intro to AI & Machine Learning Workshop",
    category: "Workshop",
    date: "2026-07-22",
    time: "2:00 PM – 5:00 PM",
    venue: "Seminar Hall 2, Academic Block",
    organizer: "AI & Data Science Club",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&q=80",
    seats: 80,
    registered: 64,
    description:
      "A hands-on afternoon covering the fundamentals of machine learning — from linear regression to a first look at neural networks. You'll train your own image classifier using Python and walk away with starter notebooks and a curated list of resources to keep learning.",
    highlights: [
      "No prior ML experience required",
      "Laptops provided for attendees without one",
      "Take-home project notebooks",
      "Certificate of participation",
    ],
  },
  {
    id: 3,
    title: "Algorithm Arena Coding Contest",
    category: "Competition",
    date: "2026-08-02",
    time: "10:00 AM – 1:00 PM",
    venue: "Computer Lab 4",
    organizer: "Competitive Programming Cell",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&q=80",
    seats: 150,
    registered: 112,
    description:
      "A timed, individual competitive programming contest with a mix of easy, medium and hard algorithmic problems. Rankings are based on correctness and speed, scored live on a public leaderboard. Great practice for placement-season coding rounds.",
    highlights: [
      "Live leaderboard during the contest",
      "Problems rated easy to hard",
      "Top 10 get fast-tracked for the placement bootcamp",
      "Individual participation only",
    ],
  },
  {
    id: 4,
    title: "Rang Utsav — Annual Cultural Fest",
    category: "Cultural",
    date: "2026-08-14",
    time: "4:00 PM – 10:00 PM",
    venue: "Open Air Amphitheatre",
    organizer: "Student Cultural Council",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=900&q=80",
    seats: 1000,
    registered: 612,
    description:
      "The campus's biggest cultural night — dance battles, live band performances, a fashion walk, and an open-mic stage for poets and singers. Food stalls run by student clubs line the courtyard all evening. Come for one act or stay for the whole show.",
    highlights: [
      "Live performances from 8 student bands & troupes",
      "Food stalls and pop-up stores",
      "Open mic slots — register on entry",
      "Free entry for all students",
    ],
  },
  {
    id: 5,
    title: "Inter-Department Sports Meet",
    category: "Sports",
    date: "2026-08-21",
    time: "7:00 AM – 6:00 PM",
    venue: "University Sports Complex",
    organizer: "Department of Physical Education",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&q=80",
    seats: 500,
    registered: 340,
    description:
      "A full day of inter-department competition across athletics, football, basketball, badminton and table tennis. Departments earn points across every event toward the overall Sports Meet trophy — come cheer your department's colors or sign up to compete.",
    highlights: [
      "10+ sporting events across the day",
      "Department trophy + individual medals",
      "Open registration for all skill levels",
      "On-site refreshments and first aid",
    ],
  },
  {
    id: 6,
    title: "Startup Summit: From Idea to Funding",
    category: "Summit",
    date: "2026-09-05",
    time: "10:00 AM – 4:00 PM",
    venue: "Conference Hall, Admin Block",
    organizer: "Entrepreneurship Cell",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=80",
    seats: 200,
    registered: 145,
    description:
      "A day-long summit bringing together student founders, alumni entrepreneurs and early-stage investors. Sessions cover idea validation, pitching, and fundraising basics, capped off with a live pitch competition for campus startups.",
    highlights: [
      "Panel with 3 alumni founders",
      "Live pitch competition with seed funding offer",
      "1:1 mentorship sign-ups",
      "Networking lunch included",
    ],
  },
  {
    id: 7,
    title: "Placement Readiness Training Camp",
    category: "Training",
    date: "2026-09-12",
    time: "9:00 AM – 1:00 PM",
    venue: "Training Hall, Placement Cell",
    organizer: "Career Development & Placement Cell",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=80",
    seats: 250,
    registered: 198,
    description:
      "A focused pre-placement bootcamp covering resume building, aptitude test strategy, group discussions and mock technical interviews with feedback from visiting recruiters. Recommended for final and pre-final year students entering placement season.",
    highlights: [
      "1:1 resume review",
      "Mock technical & HR interviews",
      "Aptitude test strategy session",
      "Open to pre-final & final year students",
    ],
  },
  {
    id: 8,
    title: "TechSphere Symposium 2026",
    category: "Symposium",
    date: "2026-09-27",
    time: "9:30 AM – 5:00 PM",
    venue: "Main Auditorium",
    organizer: "Department of Engineering",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80",
    seats: 400,
    registered: 256,
    description:
      "The department's flagship technical symposium featuring paper presentations, a robotics showcase, a project expo and guest talks from research scholars and industry leaders. A great venue to showcase your final-year projects to a wider audience.",
    highlights: [
      "Paper presentation & project expo tracks",
      "Robotics & innovation showcase",
      "Guest talks from research scholars",
      "Best Paper & Best Project awards",
    ],
  },
];

export default events;
