import React from 'react';
import ImageDog from '../../Images/Doggy.png'


export default function Card ({ name, image, temperament}) {
    const temps = temperament?.map(e => e.name)
    return (
        <div>
            <h3> {name} </h3>
            <h5> {temps.join(", ")} </h5>
            <img src= {image || ImageDog} alt= "img not found" width="420px" height="400px" />
        </div>
    );
}