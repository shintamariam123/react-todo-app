import React from 'react';
import Info from './Info';
import Header from './Header';
import Footer from './Footer';
import FilteredList from './FilteredList';
import {applyFilter, search, FILTER_ACTIVE} from '../../services/filter';
import Sort from './Sort';


export default function TodoList(props) {
    const {list, filter, mode, query, sortOption} = props.data;
    const {addNew, changeFilter, changeStatus, changeMode, setSearchQuery, setSortOption} = props.actions;
    const activeItemCount = applyFilter(list, FILTER_ACTIVE).length;
    const filteredItems = search(applyFilter(list, filter), query);

    const handleSort = () => {
     
        const sortedItems = [...filteredItems].sort((a, b) => {
            if (sortOption === 'dueDateAsc') {
                return new Date(a.dueDate) - new Date(b.dueDate);
            } else if (sortOption === 'dueDateDesc') {
                return new Date(b.dueDate) - new Date(a.dueDate);
            } else if (sortOption === 'priority') {
                const priorityOrder = { High: 1, Medium: 2, Low: 3 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            }
            return 0;
        });
        return sortedItems;
    };

    return (
        <div className="container">
            <div className="row">
                <div className="todolist">
                    <Header {...{addNew, mode, query, setSearchQuery}}/>
                    <Sort sortOption={sortOption} setSortOption={setSortOption} onSort={handleSort}/>
                    <FilteredList {...{items: handleSort(), changeStatus}}/>
                    <Footer {...{activeItemCount, filter, changeFilter, mode, changeMode}}/>
                    <Info {...{mode}}/>
                </div>
            </div>
        </div>
    );
}