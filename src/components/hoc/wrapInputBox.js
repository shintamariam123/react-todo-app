import { useState } from 'react';
import KeyCode from 'keycode-js';

export default function useWrapInputBox({ addNew }) {
    const [value, setValue] = useState('');

    const handleKeyUp = (e) => {
        const text = e.target.value.trim();
        if (e.keyCode === KeyCode.KEY_RETURN && text) {
            addNew(text);
            setValue('');
        }
    };

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return {
        value,
        setValue,
        handleKeyUp,
        handleChange,
    };
}
