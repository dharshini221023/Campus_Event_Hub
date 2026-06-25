import './Loader.css';

/**
 * Loader
 * Small branded loading animation, shown briefly on initial app load
 * and reused anywhere else a loading state is needed (e.g. form submit).
 */
function Loader({ label = 'Loading Campus Event Hub...' }) {
  return (
    <div className="loader">
      <div className="loader__ring">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p>{label}</p>
    </div>
  );
}

export default Loader;
