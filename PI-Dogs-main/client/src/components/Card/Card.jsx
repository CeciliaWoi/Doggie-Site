import React from 'react';
import ImageDog from '../../Images/Doggy.png'


export default function Card ({ name, image, weight_min, weight_max, temperament}) {
    const temps = temperament?.map(e => e.name)
    return (
        <div>
            <h3> {name} </h3>
            <h5> {temps?.join(", ")} </h5>
            <h5> Weight min: {weight_min} - Weight max: {weight_max} </h5>
            <img src= {image || ImageDog} alt= "img not found" width="420px" height="400px" />
        </div>
    );
}