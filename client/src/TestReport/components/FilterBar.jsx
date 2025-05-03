

const FilterBar = ({ filters, setFilters, onApply, onReset, suggestions, setSuggestions, onInputChange, loading1, loading2 }) => {
    return (
        <div style={{ padding: '1rem' }} className='GeneralInfo'>
            {['customer', 'partName', 'material'].map((field) => (
                <div key={field} className="autocomplete-field">
                    <input
                        type="text"
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={filters[field]}
                        onChange={(e) => onInputChange(field, e)}
                    />
                    {suggestions[field].length > 0 && (
                        <ul style={{
                            position: 'absolute',
                            // top: '100%',
                            // left: '0',
                            width: '100%',
                            maxWidth: '250px',
                            backgroundColor: 'white',
                            border: '1px solid #ccc',
                            // zIndex: '10',
                            maxHeight: '150px',
                            overflowY: 'auto',
                            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
                            listStyle: 'none',
                            // padding: '0',
                            margin: '2px 0 0 0',
                            borderRadius: '4px'
                        }}>
                            {suggestions[field].map((item, i) => (
                                <li
                                    style={{
                                        padding: '8px',
                                        cursor: 'pointer',
                                    }}
                                    key={i}
                                    onClick={() => {
                                        setFilters({ ...filters, [field]: item });
                                        setSuggestions(prev => ({ ...prev, [field]: [] })); // 👈 clear suggestions
                                    }}
                                >
                                    {item}
                                </li>

                            ))}
                        </ul>
                    )}
                </div>
            ))
            }

            <input type="date" value={filters.startDate} onChange={(e) => setFilters({ ...filters, startDate: e.target.value })} />
            <input type="date" value={filters.endDate} onChange={(e) => setFilters({ ...filters, endDate: e.target.value })} />

            <button className="submit-btn" onClick={onApply}>
                {loading1 ? 'Applying...' : 'Apply Filters'}
            </button>
            <button className="delete-btn" onClick={onReset}>
                {loading2 ? 'Removing...' : 'Remove Filters'}
            </button>
        </div >
    );
};

export default FilterBar;