import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';


export default function LandingPage() {
    return (
        <div className={styles.landing}>
            <div className={styles.textBtn}>
            <p className={styles.title}>Welcome to doggie site</p>
                <Link to='/home'>
                        <button className={styles.btn} >Let's dog!</button>
                </Link>
            <p className={styles.madeBy}>Made by Cecilia Woitasen</p>
            </div>
        </div>
    )
}