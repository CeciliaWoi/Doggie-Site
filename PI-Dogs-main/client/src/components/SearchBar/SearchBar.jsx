import { searchByName } from "../../actions/searchByName";
import React, { useState } from 'react';
import { useDispatch } from "react-redux";


export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInput(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(!name.length) {
            alert('Please, write a dog name!')
        } else {
            dispatch(searchByName(name))
            setName('');
        }
    }

    return (
        <form onSubmit={handleSubmit} >
            <input 
                onChange={handleInput} 
                placeholder='Insert a dog name' 
                value={name} 
                type='text'
                />
            <button type='submit'>Search</button>
        </form>
    )


}
