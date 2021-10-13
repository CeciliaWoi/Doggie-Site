import React from "react";
import s from './Paginado.module.css'



export default function Paginado ({dogsPerPage, allDogs, paginado}) {
    const pageNumbers = [];

    for (let i=1; i<= Math.ceil(allDogs/dogsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <div className={s.pagination}>
            {pageNumbers?.map(n => (
                        <div className={s.n} key={n}>
                            <button  className={s.btn} onClick={() => paginado(n)}>{n}</button>
                        </div>
            ))}
            </div>
        </nav>
    )
}