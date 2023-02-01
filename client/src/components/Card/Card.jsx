import "./Card.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const [shiny, setShiny] = useState(false);
  const navigate = useNavigate();

  const shinyHandler = (e) => {
    e.stopPropagation();
    setShiny(!shiny);
  };

  const redirectHandler = () => {
    navigate(`/pokemon/${props.name}`);
  };

  return (
    <div className="card">
      <div className="cardInner" onClick={redirectHandler}>
        {shiny ? (
          <img src={props.shinyImage} alt={props.name} className="pokeImage" />
        ) : (
          <img src={props.image} alt={props.name} className="pokeImage" />
        )}
        {props.shinyImage && (
          <img
            onClick={shinyHandler}
            alt="shinyToggle"
            className="shinyToggle"
            src="https://lh3.googleusercontent.com/AJm968KMXoYHPYBm6ebdb45wNbtVBhg5X25ZR4PHkZR-oE_rUw8qXDiIN5MThQjzY_6ipGX-1IyJ5c4mBqMT_bFi9O3Wkd2_XcUfLEk3O2qO"
          />
        )}

        <div className="container">
          <h4 className="Name">
            <b>{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</b>
          </h4>
          {props.types?.map((type) => {
            return (
              <p>
                {type.type.name.charAt(0).toUpperCase() +
                  type.type.name.slice(1)}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Card;
