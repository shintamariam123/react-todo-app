import React, { useState } from 'react';
import CheckBox from './CheckBox';

export default function TodoItem(props) {
    const { data, changeStatus } = props;
    const [isChecked, setIsChecked] = useState(data.completed);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [tempChecked, setTempChecked] = useState(data.completed);

    const handleChange = (checked) => {
        setTempChecked(checked); 
        setIsDialogOpen(true); 
    };

    const handleConfirm = () => {
        changeStatus(data.id, tempChecked); 
        setIsChecked(tempChecked);
        setIsDialogOpen(false);
    };

    const handleCancel = () => {
       
        setTempChecked(false);
        setIsChecked(false);
        setIsDialogOpen(false); 
    };

    const className = 'todo-item ui-state-default ' + (isChecked ? 'completed' : 'pending');

    return (
        <li className={className}>
            <div className="checkbox">
                <label>
                    <CheckBox checked={isChecked} onChange={handleChange} />
                    {data.text}
                    {data.dueDate && (
                        <span className="due-date"> (Due: {data.dueDate})</span>
                    )}
                     {data.priority && (
                        <span className={`priority ${data.priority.toLowerCase()}`}>
                            {' '}
                            - {data.priority} Priority
                        </span>
                    )}
                </label>
            </div>
            
           
            {isDialogOpen && (
                <div className="confirmation-dialog">
                    <p>Are you sure you want to mark this task as completed?</p>
                    <button className="confirm-btn" onClick={handleConfirm}>Confirm</button>
                    <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                </div>
            )}
        </li>
    );
}
