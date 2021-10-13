import React from 'react';
import { Link } from 'react-router-dom';
import ImageDog from '../../Images/Doggy.png'
import s from './Card.module.css'



export default function Card ({ id, name, image, weight_min, weight_max, temperaments}) {
    const temps = temperaments?.map(e => e.name)
    return (
        <div className={s.cards}>
            <Link 
                to={'/dogs/' + id}>
                <h3 className={s.name}> {name} </h3>
            </Link>
            <h5 className={s.temps}> {temps?.join(", ")} </h5>
            <h5 className={s.w}> Weight min: {weight_min} - Weight max: {weight_max} </h5>
            <img className={s.image} src= {image || ImageDog} alt= "img not found" width="420px" height="400px" />
        </div>
    );
}