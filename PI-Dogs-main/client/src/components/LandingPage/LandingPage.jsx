import React from 'react';
import { Link } from 'react-router-dom';
import Doggito from '../../Images/Doggito.png'
import s from './LandingPage.module.css';


export default function LandingPage() {
    return (
        <div className={s.landing}>
            <p className={s.title}>Welcome to doggie site</p>
            <Link to='/home'>
                <img 
                    src={Doggito}
                    alt= "img not found" 
                    className={s.image}
                />
            </Link>
            <p className={s.lets} >Let's dog!</p>
        </div>
    )
}