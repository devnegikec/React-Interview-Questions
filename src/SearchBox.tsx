import React, { useEffect, useState } from 'react';
import { useDebounce } from './useDebounce';

export const SearchBox = () => {
    const [input, setInput] = useState('');
    const debouncedInput = useDebounce(input, 300);
    useEffect(() => {
        if (debouncedInput) {
            console.log(`Searching for: ${debouncedInput}`);
        }
    }, [debouncedInput])

    return (
        <div className="search-box">
            <input type="text" placeholder="Search..."  onChange={(event) => setInput(event.target.value)} value={input} />
        </div>
    );
};