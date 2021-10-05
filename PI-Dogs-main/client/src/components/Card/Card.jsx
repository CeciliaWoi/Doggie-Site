import React from 'react';
import ImageDog from '../../Images/Doggy.png'


export default function Card ({ name, image, temperament}) {
    return (
        <div>
            <h3> {name} </h3>
            <h5> {temperament} </h5>
            <img src= {image || ImageDog} alt= "img not found" width="420px" height="400px" />
        </div>
    );
}