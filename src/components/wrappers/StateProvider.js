import React, { Component } from 'react';
import { FILTER_ALL } from '../../services/filter';
import { MODE_CREATE, MODE_NONE } from '../../services/mode';
import { objectWithOnly, wrapChildrenWith } from '../../util/common';
import {  addToList, updateStatus } from '../../services/todo';

class StateProvider extends Component {
    constructor() {
        super();
        // Try to load the list from localStorage
        const savedList = JSON.parse(localStorage.getItem('todoList')) || [];
        this.state = {
            query: '',
            mode: MODE_CREATE,
            filter: FILTER_ALL,
            sortOption: 'none',
            list: savedList, // Initialize with the saved list from localStorage
        };
    }

    render() {
        const children = wrapChildrenWith(this.props.children, {
            data: { ...this.state },
            actions: objectWithOnly(this, [
                'addNew',
                'changeFilter',
                'changeStatus',
                'changeMode',
                'setSearchQuery',
                'setSortOption',
            ]),
        });

        return <div>{children}</div>;
    }

    // Save the updated list to localStorage every time a new task is added
    addNew(text, dueDate = '', priority = 'Medium') {
        let updatedList = addToList(this.state.list, { text, completed: false, dueDate, priority });
        this.setState({ list: updatedList }, () => {
            // Save the updated list to localStorage
            localStorage.setItem('todoList', JSON.stringify(updatedList));
        });
    }

    changeFilter(filter) {
        this.setState({ filter });
    }

    changeStatus(itemId, completed) {
        const updatedList = updateStatus(this.state.list, itemId, completed);
        this.setState({ list: updatedList }, () => {
            // Save the updated list to localStorage
            localStorage.setItem('todoList', JSON.stringify(updatedList));
        });
    }

    changeMode(mode = MODE_NONE) {
        this.setState({ mode });
    }

    setSearchQuery(text) {
        this.setState({ query: text || '' });
    }

    setSortOption(option) {
        this.setState({ sortOption: option });
    }
}

export default StateProvider;
