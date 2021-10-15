import React from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import s from './NavBar.module.css';

export default function NavBar({
    handleClick,
    handleFilterTemp,
    handleSortTemp,
    handleSortWeight,
    handleFilterCreated,
}) {
    
    const allTemperaments = useSelector((state) => state.temperaments);
    

    return (
        <div className={s.container}>
            <div className={s.createSearch}>
                <div className={s.create}>
                    <Link to='/dog'> Create a new dog </Link>
                </div>
                <div className={s.search}>
                    <SearchBar />
                </div>
                <div>
                    <button  className={s.charge} onClick={e => {handleClick(e)}} > Reset all dogs again </button>
                </div>
            </div>
            <div>
                <select className={s.selectCont} onChange={e => handleSortTemp(e)} >
                    <option selected="false" disabled >Order by Alphabet</option>
                    <option value='asc' >A - Z</option>
                    <option value='desc' >Z - A</option>
                </select>

                <select className={s.selectCont} onChange={e => handleSortWeight(e)}>
                    <option selected="false" disabled >Order by Weight</option>
                    <option value='1' >Weight - Low to High </option>
                    <option value='2' >Weight - High to Low </option>
                </select>
                
                <select className={s.selectCont} onChange={handleFilterTemp} >
                    <option selected="false" disabled >
                        Filter by Temperaments
                    </option>
                    <option value="All" >
                        All
                    </option>
                    {
                        allTemperaments?.map((e) => (
                            <option key={e.id} value={e.name} >{e.name}</option>
                        ))
                    }
                </select> 
                <select className={s.selectCont} onChange={handleFilterCreated}>
                    <option selected="false" disabled >Filter by Existence</option>
                    <option value='All' >All Dogs</option>
                    <option value='Created' >Created Dogs</option>
                    <option value='Exist' >API Dogs</option>
                </select>
            </div>
        </div>
    )
}