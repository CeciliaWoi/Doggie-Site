import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getDetail } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import ImageDog from '../../Images/Doggy.png'



export default function Detail (props) {
    const dispatch = useDispatch();
    
    const myDog = useSelector((state) => state.detail);

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    }, [dispatch, props.match.params.id]);

    const temps = myDog[0]?.temperaments?.map(e => e.name)
    return (
        <div>
            {       
                    myDog ?
                    myDog.map((e) => {
                        return (
                            <div key={e.id}>
                                <img 
                                    src= {e.image || ImageDog} 
                                    alt= "img not found" 
                                    width="420px" 
                                    height="400px" 
                                />
                                <h1>Name: {e.name}</h1>
                                <h2>Minimum Weight: {e.height_min}</h2>
                                <h2>Maximum Weight: {e.height_max}</h2>
                                <h2>Minimum Weight: {e.weight_min}</h2>
                                <h2>Maximum Weight: {e.weight_max}</h2>
                                <h2>Life Span: {e.life_span}</h2>
                                <h3>Temperaments: {temps.join(', ')}</h3>
                            </div> )}) :
                            <p>Loading...</p>
            }
            <Link to='/home'>
                <button>Go back Home</button>
            </Link>
        </div>
    )
};