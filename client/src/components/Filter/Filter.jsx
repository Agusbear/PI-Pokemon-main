import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/actions";
import "./Filter.css";

export default function Filter() {
  const dispatch = useDispatch();
  const types = useSelector((store) => store.types);

  const [selectedTypesBool, setSelectedTypesBool] = useState(
    new Array(20).fill(false, 0)
  );
  const [selectedArray, setSelectedArray] = useState([]);

  const [filterOptions, setFilterOptions] = useState({
    whichPokemon: "all",
    typePokemon: true,
    orderPokemon: true,
    orderOptions: "id",
    orderDirection: "ascending",
    types: [],
  });

  const handleSubmit = () => {
    dispatch(actions.filterPokemon({ ...filterOptions, types: selectedArray }));
  };

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

  const handleSelectionChange = (e) => {
    e.preventDefault();
    setFilterOptions({ ...filterOptions, [e.target.name]: e.target.value });
  };

  return (
    <div className="filterContainer">
      <div className="dropdownList">
        <div className="dropdownCombo">
          <label htmlFor="whichPokemon">Cuales Pokemones?</label>
          <select
            onChange={handleSelectionChange}
            name="whichPokemon"
            className="dropdown"
          >
            <option value="all">Todos</option>
            <option value="official">Oficiales</option>
            <option value="custom">Personalizados</option>
          </select>
        </div>

        <div className="dropdownCombo">
          <label htmlFor="orderPokemon">Orden</label>
          <select
            onChange={handleSelectionChange}
            name="orderOptions"
            className="dropdown"
          >
            <option value="id">Por ID</option>
            <option value="attack">Por Ataque</option>
          </select>
        </div>

        <div className="dropdownCombo">
          <label htmlFor="orderDirection">Direccion</label>
          <select
            onChange={handleSelectionChange}
            name="orderDirection"
            className="dropdown"
          >
            <option value="ascending">Ascendiente</option>
            <option value="descending">Descendiente</option>
          </select>
        </div>

        <div className="filterSubmitContainer">
          <button className="filterButton" onClick={handleSubmit}>
            Filtrar
          </button>
        </div>
      </div>

      <div className="typesContainer">
        <ul className="typeFilterList">
          {types?.map((value, index) => {
            return (
              <li className="typeFilterElement">
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
      </div>
    </div>
  );
}
