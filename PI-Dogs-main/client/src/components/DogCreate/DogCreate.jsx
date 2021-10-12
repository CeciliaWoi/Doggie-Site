import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getTemperaments } from '../../actions';
import { postDog } from '../../actions';


function validate(input) {
    let error = {};
    if (!input.name.trim()) {
        error.name = "Please enter a dog name";
    }
    else if (!input.height_min) {
        error.height_min = "Please write a minimum height for your dog";
    }
    else if (input.height_min < 1) {
        error.height_min = "Please write a minimum height greater than 0 for your dog";
    }
    else if (!input.height_max) {
        error.height_max = "Please write a maximum height for your dog";
    }
    else if (input.height_max <= input.height_min) {
        error.height_max = "Please write a maximum height greater than height minimum for your dog";
    }
    else if (!input.weight_min) {
        error.weight_min = "Please write a minimum weight for your dog";
    }
    else if (input.weight_min < 1) {
        error.weight_min = "Please write a minimum weight greater than 0 for your dog";
    }
    else if (!input.weight_max) {
        error.height_max = "Please write a maximum weight for your dog";
    }
    else if (input.weight_max <= input.weight_min) {
        error.weight_max = "Please write a maximum weight greater than weight minimum for your dog";
    }
    return error;
  }
  

export default function DogCreate() {
    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.temperaments);
    const history = useHistory();
    const [errors, setErrors] = useState({});
    
    
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
    }, [dispatch]);

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    function handleSelect(e) {
        setInput({
            ...input,
            temperaments: [...input.temperaments, e.target.value]
        })
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        // console.log(input);
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

    function handleDelete(e) {
        setInput({
            ...input,
            temperaments: input.temperaments.filter((t) => t !== e)
        })
    }


    return(
        <div>
            <Link to='/home'><button>Back</button></Link>
            <h1>Create a new Dog!</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input
                    type='text'
                    value= {input.name}
                    name='name'
                    onChange={handleChange}
                    />
                    {
                        errors.name && (
                            <p>{errors.name}</p>
                        )
                    }
                </div>
                <div>
                    <label>Height Min:</label>
                    <input
                    type='text'
                    value= {input.height_min}
                    name='height_min'
                    onChange={handleChange}
                    />
                    {
                        errors.height_min && (
                            <p>{errors.height_min}</p>
                        )
                    }
                </div>
                <div>
                    <label>Height Max:</label>
                    <input
                    type='text'
                    value= {input.height_max}
                    name='height_max'
                    onChange={handleChange}
                    />
                    {
                        errors.height_max && (
                            <p>{errors.height_max}</p>
                        )
                    }
                </div>
                <div>
                    <label>Weight Min:</label>
                    <input
                    type='text'
                    value= {input.weight_min}
                    name='weight_min'
                    onChange={handleChange}
                    />
                    {
                        errors.weight_min && (
                            <p>{errors.weight_min}</p>
                        )
                    }
                </div>
                <div>
                    <label>Weight Max:</label>
                    <input
                    type='text'
                    value= {input.weight_max}
                    name='weight_max'
                    onChange={handleChange}
                    />
                    {
                        errors.weight_max && (
                            <p>{errors.weight_max}</p>
                        )
                    }
                </div>
                <div>
                    <label>Life Span:</label>
                    <input
                    type='text'
                    value= {input.life_span}
                    name='life_span'
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input
                    type='text'
                    value= {input.image}
                    name='image'
                    onChange={handleChange}
                    />
                </div>
                    <label>Temperaments:</label>
                    <select onChange={e => handleSelect(e)}>
                        {
                            temperaments?.map((t) => (
                                <option value={t.name}>{t.name}</option>
                            ))
                        }
                    </select>
                    <button type='submit'>Create Dog</button>
            </form>
            {input.temperaments.map(t => 
                <div>
                    <p>{t}</p>
                    <button onClick={() => handleDelete(t)}>X</button>
                </div>)}
        </div>
    )
}