import './SearchBar.css';

/**
 * SearchBar
 * Controlled input — receives the current value and an onChange
 * handler as props so the parent page owns the filtering logic.
 */
function SearchBar({ value, onChange, placeholder = 'Search events by title...' }) {
  return (
    <div className="search-bar">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="search-bar__icon">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
      </svg>
      <input
        type="text"
        className="search-bar__input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search events"
      />
      {value && (
        <button
          type="button"
          className="search-bar__clear"
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          &times;
        </button>
      )}
    </div>
  );
}

export default SearchBar;
