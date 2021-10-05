import React from "react";
import style from './Paginado.module.css'



export default function Paginado ({dogsPerPage, allDogs, paginado}) {
    const pageNumbers = [];

    for (let i=1; i<= Math.ceil(allDogs/dogsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="paginado">
            {pageNumbers?.map(n => (
                        <ul className={style.n} key={n}>
                            <button onClick={() => paginado(n)}>{n}</button>
                        </ul>
            ))}
            </ul>
        </nav>
    )


}