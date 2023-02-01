import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions/actions";
import "./Detail.css";

export default function Detail() {
  const store = useSelector((state) => state.pokemonDetail);
  const dispatch = useDispatch();
  const { name } = useParams();
  const [loading, setLoading] = useState(true);
  const [shiny, setShiny] = useState(false);

  useEffect(() => {
    dispatch(actions.getPokemonDetailName(name)).then(setLoading(false));
    return () => dispatch(actions.cleanupPokemonDetail()); //cleanup Detail
  }, [name]);

  const shinyHandler = (e) => {
    e.stopPropagation();
    setShiny(!shiny);
  };

  return (
    <div>
      <div className="wrapper">
        <div className="imageContainer">
          {shiny ? (
            <img
              src={store.shinyImage}
              alt={store.name}
              className="pokemonImage"
            />
          ) : (
            <img src={store.image} alt={store.name} className="pokemonImage" />
          )}
          {store.shinyImage && (
            <img
              onClick={shinyHandler}
              alt="shinyToggle"
              className="shinyToggleDetail"
              src="https://lh3.googleusercontent.com/AJm968KMXoYHPYBm6ebdb45wNbtVBhg5X25ZR4PHkZR-oE_rUw8qXDiIN5MThQjzY_6ipGX-1IyJ5c4mBqMT_bFi9O3Wkd2_XcUfLEk3O2qO"
            />
          )}
          <b>{store?.name?.charAt(0).toUpperCase() + store?.name?.slice(1)}</b>
        </div>
        <div className="detailContainer">
          <div className="detailCard">
            <h3 className="cardTitle">Tipos</h3>
            <ul className="typeList">
              {store.types?.map((type) => {
                return (
                  <li key={type.type.name}>
                    {type.type.name[0].toUpperCase() + type.type.name.slice(1)}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="detailCard">
            <h3 className="cardTitle">ID</h3>
            <p>{store?.id}</p>
          </div>
          <div className="detailCard">
            <h3 className="cardTitle">Estadisticas</h3>
            <ul className="typeList">
              {store.stats?.map((stat) => {
                return (
                  <li key={stat.stat.name}>
                    {stat.stat.name[0].toUpperCase() + stat.stat.name.slice(1)}:{" "}
                    {stat.base_stat}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="detailCardLast">
            <h3 className="cardTitle">Extras</h3>
            <p>Altura: {store?.height}</p>
            <p>Peso: {store?.weight}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
