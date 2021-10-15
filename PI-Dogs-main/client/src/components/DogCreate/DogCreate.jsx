import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postDog } from "../../actions";
import { getTemperaments } from "../../actions";
import s from "./DogCreate.module.css";

function validate(input) {
  let error = {};
  if (!input.name.trim()) {
    error.name = "Please enter a dog name";
  } else if (!input.height_min) {
    error.height_min = "Please enter a minimum height for your dog";
  } else if (!input.height_max) {
    error.height_max = "Please enter a maximum height for your dog";
  } else if (parseInt(input.height_max) <= parseInt(input.height_min)) {
    error.height_max ="Please enter a maximum height greater than the minimum height for your dog";
  } else if (!input.weight_min) {
    error.weight_min = "Please enter a minimum weight for your dog";
  } else if (!input.weight_max) {
    error.weight_max = "Please enter a maximum weight for your dog";
  } else if (parseInt(input.weight_max) <= parseInt(input.weight_min)) {
    error.weight_max = "Please enter a maximum weight greater than the minimum weight for your dog";
  }
  return error;
}

export default function DogCreate() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
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
    temperaments: [],
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    setInput({
      ...input,
      temperaments: [...input.temperaments, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    if (
      Object.keys(error).length > 0 ||
      !input.name ||
      !input.height_min ||
      !input.height_max ||
      !input.weight_min ||
      !input.weight_max
    ) {
      alert("Please complete the information to create a dog!");
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
        temperaments: [],
      });
      history.push("/home");
    }
  }

  function handleDelete(e) {
    setInput({
      ...input,
      temperaments: input.temperaments.filter((t) => t !== e),
    });
  }

  return (
    <div className={s.bg}>
      <div>
        <Link to="/home">
          <button className={s.btnBack}>Back</button>
        </Link>
      </div>
      <h1 className={s.titleForm}>Create a new Dog!</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
            className={s.inName}
            placeholder="Insert a dog name"
          />
          {error.name && <p className={s.errors}>{error.name}</p>}
        </div>
        <div>
          <input
            type="number"
            value={input.height_min}
            min="1"
            max="99"
            name="height_min"
            onChange={(e) => handleChange(e)}
            className={s.inhMin}
            placeholder="Insert a height minimum"
          />
          {error.height_min && <p className={s.errors}>{error.height_min}</p>}
        </div>
        <div>
          <input
            type="number"
            value={input.height_max}
            min="2"
            max="99"
            name="height_max"
            onChange={(e) => handleChange(e)}
            className={s.inHMax}
            placeholder="Insert a height maximum"
          />
          {error.height_max && <p className={s.errors}>{error.height_max}</p>}
        </div>
        <div>
          <input
            type="number"
            value={input.weight_min}
            min="1"
            max="99"
            name="weight_min"
            onChange={(e) => handleChange(e)}
            className={s.inWMin}
            placeholder="Insert a weight minimum"
          />
          {error.weight_min && <p className={s.errors}>{error.weight_min}</p>}
        </div>
        <div>
          <input
            type="number"
            value={input.weight_max}
            min="2"
            max="99"
            name="weight_max"
            onChange={(e) => handleChange(e)}
            className={s.inWMax}
            placeholder="Insert a weight maximum"
          />
          {error.weight_max && <p className={s.errors}>{error.weight_max}</p>}
        </div>
        <div>
          <input
            type="text"
            value={input.life_span}
            min="1"
            max="40"
            name="life_span"
            onChange={(e) => handleChange(e)}
            className={s.inLS}
            placeholder="Insert a life span"
          />
          {error.life_span && <p className={s.errors}>{error.life_span}</p>}
        </div>
        <div>
          <input
            type="url"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
            className={s.inUrl}
            placeholder="Insert a image url"
          />
        </div>
        <select onChange={(e) => handleSelect(e)} className={s.selectCont}>
          <option selected="false" disabled>
            Select your Temperaments
          </option>
          {temperaments?.map((t) => (
            <option value={t.name}>{t.name}</option>
          ))}
        </select>
        {Object.keys(error).length > 0 ? null : (
          <button type="submit" className={s.btn}>
            Create Dog
          </button>
        )}
      </form>
      {input.temperaments.map((t) => (
        <div className={s.temps}>
          <p className={s.t}>{t}</p>
          <button className={s.x} onClick={() => handleDelete(t)}>
            X
          </button>
        </div>
      ))}
    </div>
  );
}
