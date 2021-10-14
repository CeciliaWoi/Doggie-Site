import { searchByName } from "../../actions";
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import s from './SearchBar.module.css'


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
            <div>
                <input 
                    onChange={handleInput} 
                    placeholder='Insert a dog name' 
                    value={name} 
                    type='text'
                    className={s.input}
                    />
                <button className={s.btn} type='submit'>Search</button>
            </div>
        </form>
    )


}
