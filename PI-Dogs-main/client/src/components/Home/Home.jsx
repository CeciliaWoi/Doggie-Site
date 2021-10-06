import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs } from "../../actions/getDogs";
import { getTemperaments } from "../../actions/getTemperaments";
import { filterByTemps } from "../../actions/filterByTemps";
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import Paginado from "../Paginado/Paginado";
import { filterByExistence } from "../../actions/filterByExistence";
import SearchBar from "../SearchBar/SearchBar";


export default function Home () {
    
    const dispatch = useDispatch();
    
    const allDogs = useSelector((state) => state.dogs);
    const allTemperaments = useSelector((state) => state.temperaments);
    const [orden, setOrden] = useState("")

    // Paginado ----------------------------------------------------------|
    const [actualPage, setActualPage] = useState(1);
    const [dogsPerPage] = useState(8);
    const indexOfLastDog = actualPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const actualDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

    const paginado = (pageNumber) => {
        setActualPage(pageNumber);
    }

    // |--------------------------------------------------------------------|


    useEffect(() => {
        dispatch(getDogs());
    }, [])
    
    useEffect(() => {
        dispatch(getTemperaments());
    }, [])

    
    function handleClick(e) {
        e.preventDefault();
        dispatch(getDogs());
    }

    function handleFilterTemp(e) {
        e.preventDefault();
        dispatch(filterByTemps(e.target.value));
    }

    function handleFilterCreated(e) {
        e.preventDefault();
        dispatch(filterByExistence(e.target.value));
        setActualPage(1);
        setOrden(e.target.value);
      }


    return (
        <div>
            <div>
                <SearchBar/>
            </div>
            <Link to='/dog'> Create a new dog </Link>
            <h1> Doggiepedia </h1>
            <button onClick={e => {handleClick(e)}} > Charge all dogs again </button>
            <div>
                <select>
                    <option value='1' >Weight - Low to High </option>
                    <option value='2' >Weight - High to Low </option>
                    <option value='asc' >Ascendent</option>
                    <option value='desc' >Descendent</option>
                </select>
                
                <select onChange={handleFilterTemp}>
                    <option selected="false" disabled >
                        Temperaments
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
                <select onChange={handleFilterCreated}>
                    <option value='All' >All Dogs</option>
                    <option value='Created' >Created Dogs</option>
                    <option value='Exist' >Existing Dogs</option>
                </select>
                <div>
                        <Paginado
                            dogsPerPage = {dogsPerPage}
                            allDogs = {allDogs.length}
                            paginado = {paginado}
                        />
                {  
                   actualDogs?.map (e => {
                       return ( 
                            <ul key={e.id}>
                                <Link to={ "/home/" + e.id } >
                                    <Card name= {e.name} image= {e.image.url} temperament= {e.temperament} />
                                </Link>
                            </ul>
                   );
                })}
                </div>
            </div>
        </div>
    )
}