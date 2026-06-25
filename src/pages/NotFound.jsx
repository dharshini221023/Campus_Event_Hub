import { Link } from 'react-router-dom';
import './NotFound.css';

/**
 * NotFound
 * Catch-all 404 page rendered for the "*" route and any unmatched
 * event id. Offers a clear way back to the homepage.
 */
function NotFound() {
  return (
    <div className="page-enter not-found">
      <div className="container not-found__content">
        <div className="not-found__ticket">
          <span>404</span>
        </div>
        <h1>This Event Doesn't Exist</h1>
        <p>
          The page you're looking for may have been moved, cancelled, or the
          link might be incorrect. Let's get you back on track.
        </p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
