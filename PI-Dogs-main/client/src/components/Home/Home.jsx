import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
    getDogs,
    getTemperaments,
    filterByTemps,
    filterByExistence,
    orderByName,
    orderByWeight
} from "../../actions";
import Card from '../Card/Card';
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import Loading from '../Loading/Loading'
import styles from './Home.module.css'


export default function Home () {
    
    const dispatch = useDispatch();
    
    const allDogs = useSelector((state) => state.dogs);
    const allTemperaments = useSelector((state) => state.temperaments);
    const [, setOrden] = useState("")

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
    }, [dispatch])
    
    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch])

    if (!allDogs.length) {
        return <Loading />;
      }

    
    function handleClick(e) {
        e.preventDefault();
        dispatch(getDogs());
    }

    function handleFilterTemp(e) {
        e.preventDefault();
        dispatch(filterByTemps(e.target.value));
        setActualPage(1);
        setOrden(e.target.value);
    }

    function handleFilterCreated(e) {
        e.preventDefault();
        dispatch(filterByExistence(e.target.value));
        setActualPage(1);
        setOrden(e.target.value);
      }

    function handleSortTemp(e) {
        e.preventDefault(e);
        dispatch(orderByName(e.target.value))
        setActualPage(1);
        setOrden(e.target.value);
    }

    function handleSortWeight(e) {
        e.preventDefault(e);
        dispatch(orderByWeight(e.target.value));
        setActualPage(1);
        setOrden(e.target.value);
    }


    return (
        <div>
            <h1> Doggiepedia </h1>
            <Link to='/dog'> Create a new dog </Link>
            <div>
                <SearchBar setActualPage={setActualPage} />
            </div>
            <button onClick={e => {handleClick(e)}} > Charge all dogs again </button>
            <div>
                <select onChange={e => handleSortTemp(e)}>
                    <option selected="false" disabled >Order by Alphabet</option>
                    <option value='asc' >Ascendent</option>
                    <option value='desc' >Descendent</option>
                </select>

                <select onChange={e => handleSortWeight(e)}>
                    <option selected="false" disabled >Order by Weight</option>
                    <option value='1' >Weight - Low to High </option>
                    <option value='2' >Weight - High to Low </option>
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
                    <option selected="false" disabled >Order by Existence</option>
                    <option value='All' >All Dogs</option>
                    <option value='Created' >Created Dogs</option>
                    <option value='Exist' >API Dogs</option>
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
                                        <Card 
                                            id= {e.id}
                                            name= {e.name} 
                                            image= { e.image } 
                                            weight_min={e.weight_min} 
                                            weight_max={e.weight_max} 
                                            temperaments= {e.temperaments} />
                                    </Link>
                                </ul>
                        ) 
                    })
                }
                <Paginado
                            dogsPerPage = {dogsPerPage}
                            allDogs = {allDogs.length}
                            paginado = {paginado}
                        />
                </div>
            </div>
        </div>
    )
}