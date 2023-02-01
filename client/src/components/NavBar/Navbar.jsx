import { NavLink } from "react-router-dom";
import "./NavBar.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiSearch from "../../apiCalls/search.js";

export default function Navbar() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleInput = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      apiSearch(e.target.value)
        .then((response) => {
          navigate(`/pokemon/${e.target.value.toLowerCase()}`);
        })
        .catch((err) => {
          alert(err);
          console.log(err);
        });
    }
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <>
      <nav>
        <div className="logoImgDiv">
          <img
            src="https://i.postimg.cc/nhBG2DZm/userlmn-8df8d8e1cf179e0e6329a531c3816e82.png"
            alt="logo"
            className="logoImg"
            onClick={handleLogoClick}
          />
        </div>

        <div className="navMenu">
          <input
            type={"text"}
            placeholder={"Buscar..."}
            onChange={handleInput}
            value={searchInput}
            onKeyDown={handleEnter}
            className={"searchInput"}
          />

          <NavLink className={"createBtn"} to="/create" activeStyle>
            Crear Pokemon
          </NavLink>
        </div>
      </nav>
    </>
  );
}
