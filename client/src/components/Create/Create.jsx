import React, { useState, useEffect } from "react";
import "./Create.css";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/actions";

export default function Create() {
  const dispatch = useDispatch();
  const types = useSelector((store) => store.types);

  const [selectedTypesBool, setSelectedTypesBool] = useState(
    new Array(20).fill(false, 0)
  );

  useEffect(() => {
    dispatch(actions.getTypes());
  }, []);

  const [selectedArray, setSelectedArray] = useState([]);

  const [inputs, setInputs] = useState({
    name: "",
    id: null,
    hp: null,
    attack: null,
    speed: null,
    height: null,
    weight: null,
    image: "",
    defense: null,
  });

  const [errors, setErrors] = useState({
    name: "",
    id: "",
    hp: "",
    attack: "",
    speed: "",
    height: "",
    weight: "",
    image: "",
    defense: "",
  });

  function validate(inputs) {
    let errors = {};
    if (inputs.name === "") {
      errors.name = "Se requiere un nombre";
    } else {
      if (
        inputs.id < 10000 ||
        inputs.id > 100000 ||
        inputs.id < 0 ||
        inputs.id % 1 !== 0
      ) {
        errors.id = "Debe ser un numero entero positivo entre 10000 y 100000";
      } else {
        if (inputs.image === "") {
          errors.image = "Debe seleccionar una imagen";
        }
      }
    }

    return errors;
  }

  function handleChange(e) {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...inputs,
        [e.target.name]: e.target.value,
      })
    );
  }

  const handleCheckboxChange = (position, value) => {
    const temp = selectedTypesBool.map((item, index) =>
      index === position ? !item : item
    );
    setSelectedTypesBool(temp);

    if (!selectedArray.includes(value)) {
      setSelectedArray([...selectedArray, value]);
    } else {
      setSelectedArray(
        selectedArray.filter((a) => a !== value).filter((a) => a)
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length !== 0) {
      alert("Debe llenar todos los campos");
    } else {
      dispatch(
        actions.createPokemon({
          name: inputs.name.toLowerCase().replace(" ", "-"),
          hp: inputs.hp,
          id: inputs.id,
          attack: inputs.attack,
          defense: inputs.defense,
          speed: inputs.speed,
          height: inputs.height,
          weight: inputs.weight,
          types: selectedArray,
          image: inputs.image,
        })
      )
        .then((res) => alert('Pokemon creado!'))
        .catch((err) => {
          console.log(err);
          alert(err.response.data[0]?.message);
        });
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {errors.name ? <small className="danger">{errors.name}</small> : null}
        <label for="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
          value={inputs.name}
          className={errors.name && "warning"}
          placeholder={"No se puede repetir nombres"}
        />

        {errors.id ? <small className="danger">{errors.id}</small> : null}
        <label for="id">ID:</label>
        <input
          type="number"
          id="id"
          name="id"
          onChange={handleChange}
          value={inputs.id}
          className={errors.id && "warning"}
          min={10000}
          placeholder={"Debe ser mayor a 10000"}
        />

        {errors.hp ? <small className="danger">{errors.hp}</small> : null}
        <label for="hp">HP:</label>
        <input
          type="number"
          id="hp"
          name="hp"
          onChange={handleChange}
          value={inputs.hp}
          className={errors.hp && "warning"}
          placeholder={"Debe ser entre 0 y 100"}
        />

        {errors.attack ? (
          <small className="danger">{errors.attack}</small>
        ) : null}
        <label for="attack">Attack:</label>
        <input
          type="number"
          id="attack"
          name="attack"
          onChange={handleChange}
          value={inputs.attack}
          className={errors.attack && "warning"}
          placeholder={"Debe ser entre 0 y 100"}
        />

        {errors.defense ? (
          <small className="danger">{errors.defense}</small>
        ) : null}
        <label for="defense">Defense:</label>
        <input
          type="number"
          id="defense"
          name="defense"
          onChange={handleChange}
          value={inputs.defense}
          className={errors.defense && "warning"}
          placeholder={"Debe ser entre 0 y 100"}
        />

        {errors.speed ? <small className="danger">{errors.speed}</small> : null}
        <label for="speed">Speed:</label>
        <input
          type="number"
          id="speed"
          name="speed"
          onChange={handleChange}
          value={inputs.speed}
          className={errors.speed && "warning"}
          placeholder={"Debe ser entre 0 y 100"}
        />

        {errors.height ? (
          <small className="danger">{errors.height}</small>
        ) : null}
        <label for="height">Height:</label>
        <input
          type="number"
          id="height"
          name="height"
          onChange={handleChange}
          value={inputs.height}
          className={errors.height && "warning"}
          placeholder={"Debe ser entre 0 y 100"}
        />

        {errors.weight ? (
          <small className="danger">{errors.weight}</small>
        ) : null}
        <label for="weight">Weight:</label>
        <input
          type="number"
          id="weight"
          name="weight"
          onChange={handleChange}
          value={inputs.weight}
          className={errors.weight && "warning"}
          placeholder={"Debe ser entre 0 y 100"}
        />

        {errors.image ? <small className="danger">{errors.image}</small> : null}
        <label for="image">Image:</label>
        <input
          type="text"
          id="image"
          name="image"
          onChange={handleChange}
          value={inputs.image}
          className={errors.image && "warning"}
          placeholder={"URL"}
        />
        <ul className="typeBtnList">
          {types?.map((value, index) => {
            return (
              <li className="typeElement">
                <input
                  key={value}
                  id={value}
                  type="checkbox"
                  name={value}
                  value={value}
                  checked={selectedTypesBool[index]}
                  onChange={() => handleCheckboxChange(index, value)}
                />
                <label htmlFor={value}>
                  {value[0].toUpperCase() + value.slice(1)}
                </label>
              </li>
            );
          })}
        </ul>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
