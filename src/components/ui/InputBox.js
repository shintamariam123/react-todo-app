import React, { useState } from 'react';
import useWrapInputBox from '../hoc/wrapInputBox';

function InputBox(props) {
    const { value, handleChange, handleKeyUp } = useWrapInputBox(props);
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('Medium'); 

    const handleAddTask = (e) => {
        if (e.keyCode === 13 && value.trim() !== '') {  
            props.addNew(value, dueDate, priority); 
            setDueDate('');  
            setPriority('Medium');  
        }
    };

    return (
        <div>
            <input
                autoFocus
                type="text"
                className="form-control add-todo"
                value={value}
                onKeyUp={(e) => {
                    handleKeyUp(e);
                    handleAddTask(e);
                }}
                onChange={handleChange}
                placeholder="Add New Task"
            />
            <input
                type="date"
                className="form-control due-date-input"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                placeholder="Due Date"
            />
             <select
                className="form-control priority-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
            >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
        </div>
    );
}

export default InputBox;
