import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions/actions";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getAllPokemon());
    dispatch(actions.getTypes());
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: 'center' }}>
      <Link to={"/pokemon"}>
        <button className="enterBtn">Ingresar</button>
      </Link>
    </div>
  );
}
