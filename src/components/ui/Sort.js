import React from 'react';

function Sort({ sortOption, setSortOption }) {
    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    return (
        <div className="sort-dropdown">
            <label htmlFor="sort-tasks">Sort by:</label>
            <select
                id="sort-tasks"
                value={sortOption}
                onChange={handleSortChange}
                className="form-control"
            >
                <option value="none">None</option>
                <option value="dueDateAsc">Due Date (Ascending)</option>
                <option value="dueDateDesc">Due Date (Descending)</option>
                <option value="priority">Priority (High > Medium > Low)</option>
            </select>
        </div>
    );
}

export default Sort;
