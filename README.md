# Campus Event Hub

A modern, responsive React website for browsing, exploring, and registering
for college events — hackathons, workshops, fests, sports meets, and more.

## Tech Stack
- React 18 (Functional Components + Hooks)
- React Router DOM v6
- Plain modern CSS (CSS variables, Grid/Flexbox, no UI framework)
- Vite (dev server & build tool)

## Getting Started

```bash
npm install
npm install react-router-dom
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  components/   Reusable UI pieces (Navbar, Footer, Hero, EventCard, EventList, SearchBar, Loader, ScrollToTop)
  pages/        Routed pages (Home, Events, EventDetails, Register, Contact, NotFound)
  data/         Sample event data (events.js) — single source of truth
  App.jsx       Route definitions + shared layout
  App.css       Layout-level styles
  index.css     Design tokens, reset, shared utility classes
```

## Routes

| Path           | Page          |
|----------------|---------------|
| `/`            | Home          |
| `/events`      | Events list + search |
| `/events/:id`  | Event details |
| `/register`    | Registration form |
| `/contact`     | Contact page  |
| `*`            | 404 Not Found |

## Notable Details
- All event data flows through props — `EventList` maps over an `events`
  array prop and passes individual fields to each `EventCard`.
- `EventDetails` reads the `:id` route param with `useParams()` and looks
  it up in `src/data/events.js`; unmatched ids redirect to the 404 page.
- The registration and contact forms are fully controlled components with
  client-side validation and a success state — no backend required.
- Design signature: a "ticket stub" motif (dashed perforation + notches)
  ties the card and 404 page visuals back to the idea of an event ticket.
