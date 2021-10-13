import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { postDog } from '../../actions';
import { getTemperaments } from "../../actions";
import s from './DogCreate.module.css';

function validate(input) {
    let error = {};
    if (!input.name.trim()) {
        error.name = "Please enter a dog name";
    }
    else if (!input.height_min) {
        error.height_min = "Please write a minimum height for your dog";
    }
    else if (parseInt(input.height_min) < 1) {
        error.height_min = "Please write a minimum height greater than 0 for your dog";
    }
    else if (!input.height_max) {
        error.height_max = "Please write a maximum height for your dog";
    }
    else if (parseInt(input.height_max) <= parseInt(input.height_min)) {
        error.height_max = "Please write a maximum height greater than height minimum for your dog";
    }
    else if (!input.weight_min) {
        error.weight_min = "Please write a minimum weight for your dog";
    }
    else if (parseInt(input.weight_min < 1)) {
        error.weight_min = "Please write a minimum weight greater than 0 for your dog";
    }
    else if (!input.weight_max) {
        error.height_max = "Please write a maximum weight for your dog";
    }
    else if (parseInt(input.weight_max) <= parseInt(input.weight_min)) {
        error.weight_max = "Please write a maximum weight greater than weight minimum for your dog";
    }
    else if (parseInt(input.life_span) < 0) {
        error.life_span = "Please write a life span greater than 0 for your dog";
    }
    else if(!input.temperaments.length) {
        error.temperaments = "Please select temperaments for your dog"
    }
    return error;
  }


export default function DogCreate() {
    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.temperaments);
    const history = useHistory();
    
    const [error, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        life_span: "",
        image: "",
        temperaments: []
    })

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch])

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        
        setErrors(validate(input));
    }

    function handleSelect(e) {
        setInput({
            ...input,
            temperaments: [...input.temperaments, e.target.value]
        })
    }
    

    function handleSubmit(e) {
        e.preventDefault();
        setErrors(
            validate({
              ...input,
              [e.target.name]: e.target.value,
            })
          );
        if((Object.keys(error).length === 0) || (!input.name || !input.height_min || !input.height_max || !input.weight_min || !input.weight_max || !input.temperaments.length)) {
            alert('Please complete the information to create a dog!') 
        } else {
            dispatch(postDog(input));
            alert("The dog was created successfully!");
            setInput({
            name: "",
            height_min: "",
            height_max: "",
            weight_min: "",
            weight_max: "",
            life_span: "",
            image: "",
            temperaments: []
        })
        history.push('/home');
        }       
    }

    function handleDelete(e) {
        setInput({
            ...input,
            temperaments: input.temperaments.filter((t) => t !== e)
        })
    }


    return(
        <div className={s.bg}>
            <div>
                <Link to='/home'><button  className={s.btnBack} >Back</button></Link>
            </div>
            <h1 className={s.titleForm}>Create a new Dog!</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label className={s.label}>Name:</label>
                    <input
                    type='text'
                    value= {input.name}
                    name='name'
                    onChange={(e) => handleChange(e)}
                    className={s.input}
                    />
                    {
                        error.name && (
                            <p className={s.errors}>{error.name}</p>
                        )
                    }
                </div>
                <div>
                    <label className={s.label}>Height Min:</label>
                    <input
                    type='number'
                    value= {input.height_min}
                    name='height_min'
                    onChange={(e) => handleChange(e)}
                    className={s.input}
                    />
                    {
                        error.height_min && (
                            <p className={s.errors}>{error.height_min}</p>
                        )
                    }
                </div>
                <div>
                    <label className={s.label}>Height Max:</label>
                    <input
                    type='number'
                    value= {input.height_max}
                    name='height_max'
                    onChange={(e) => handleChange(e)}
                    className={s.input}
                    />
                    {
                        error.height_max && (
                            <p className={s.errors}>{error.height_max}</p>
                        )
                    }
                </div>
                <div>
                    <label className={s.label}>Weight Min:</label>
                    <input
                    type='number'
                    value= {input.weight_min}
                    name='weight_min'
                    onChange={(e) => handleChange(e)}
                    className={s.input}
                    />
                    {
                        error.weight_min && (
                            <p className={s.errors}>{error.weight_min}</p>
                        )
                    }
                </div>
                <div>
                    <label className={s.label}>Weight Max:</label>
                    <input
                    type='number'
                    value= {input.weight_max}
                    name='weight_max'
                    onChange={(e) => handleChange(e)}
                    className={s.input}
                    />
                    {
                        error.weight_max && (
                            <p className={s.errors}>{error.weight_max}</p>
                        )
                    }
                </div>
                <div>
                    <label className={s.label}>Life Span:</label>
                    <input
                    type='text'
                    value= {input.life_span}
                    name='life_span'
                    onChange={(e) => handleChange(e)}
                    className={s.input}
                    />
                    {
                        error.life_span && (
                            <p className={s.errors}>{error.life_span}</p>
                        )
                    }
                </div>
                <div>
                    <label className={s.label}>Image:</label>
                    <input
                    type='url'
                    value= {input.image}
                    name='image'
                    onChange={(e) => handleChange(e)}
                    className={s.input}
                    />
                </div>
                    <label className={s.label}>Temperaments:</label>
                    <select 
                        onChange={e => handleSelect(e)}
                        className={s.selectCont}
                    >
                        {
                            temperaments?.map((t) => (
                                <option value={t.name}>{t.name}</option>
                            ))
                        }
                    </select>
                    {
                        Object.keys(error).length > 0 ?
                        <button type='submit' className={s.btnOff}>Create Dog</button> :
                        <button type='submit' className={s.btn}>Create Dog</button>
                    }
            </form>
            {input.temperaments.map(t => 
                <div className={s.temps}>
                    <p className={s.t}>{t}</p>
                    <button className={s.x} onClick={() => handleDelete(t)}>X</button>
                </div>)}
        </div>
    )
}