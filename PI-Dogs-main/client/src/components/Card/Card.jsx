import React from 'react';
import { Link } from 'react-router-dom';
import ImageDog from '../../Images/Doggy.png'



export default function Card ({ id, name, image, weight_min, weight_max, temperaments}) {
    const temps = temperaments?.map(e => e.name)
    return (
        <div>
            <Link 
                to={'/dogs/' + id}>
                <h3> {name} </h3>
            </Link>
            <h5> {temps?.join(", ")} </h5>
            <h5> Weight min: {weight_min} - Weight max: {weight_max} </h5>
            <img src= {image || ImageDog} alt= "img not found" width="420px" height="400px" />
        </div>
    );
}