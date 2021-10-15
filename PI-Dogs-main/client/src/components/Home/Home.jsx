import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getDogs,
  getTemperaments,
  filterByTemps,
  filterByExistence,
  orderByName,
  orderByWeight,
} from "../../actions";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import Loading from "../Loading/Loading";
import NavBar from "../NavBar/NavBar";
import s from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();

  const allDogs = useSelector((state) => state.dogs);

  const [, setOrden] = useState("");

  // Paginado ----------------------------------------------------------|
  const [actualPage, setActualPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const indexOfLastDog = actualPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage; 
  const actualDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  const paginado = (pageNumber) => {
    setActualPage(pageNumber);
  };

  // |--------------------------------------------------------------------|

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

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
    dispatch(orderByName(e.target.value));
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
    <div className={s.homeBg}>
      <h1 className={s.titleHome}> Doggie Site </h1>
      <NavBar
        handleClick={handleClick}
        handleFilterTemp={handleFilterTemp}
        handleFilterCreated={handleFilterCreated}
        handleSortTemp={handleSortTemp}
        handleSortWeight={handleSortWeight}
      />
      <div>
        <Paginado
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
        />
        <ul className={s.dogGrid}>
          {actualDogs?.map((e) => {
            return (
              <Link to={"/home/" + e.id}>
                <Card
                  id={e.id}
                  name={e.name}
                  image={e.image}
                  weight_min={e.weight_min}
                  weight_max={e.weight_max}
                  temperaments={e.temperaments}
                />
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
