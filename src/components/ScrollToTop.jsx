import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop
 * Utility component (no UI) that resets scroll position to the top
 * of the page every time the route changes. Mounted once in App.jsx.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window.HTMLElement.prototype ? 'instant' : 'auto' });
  }, [pathname]);

  return null;
}

export default ScrollToTop;
