import Card from "../Card/Card.jsx";
import Filter from "../Filter/Filter.jsx";
import Paginate from "../Paginate/Paginate.jsx";
import "./Listing.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/actions";

const Listing = () => {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.filteredPokemon);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    dispatch(actions.getAllPokemon());
    dispatch(actions.getTypes());
    if (pokemon.length === 0) {
      setLoading(true);
    } else setLoading(false);

    setCurrentItems(pokemon.slice(0, itemsPerPage));
  }, [pokemon]);

  const paginate = (paginateTo) => {
    setPageNumber(paginateTo);
    setCurrentItems(
      pokemon.slice(paginateTo * itemsPerPage, (paginateTo + 1) * itemsPerPage)
    );
  };

  const paginateHandler = (action) => {
    if (action === "next") {
      if (pageNumber === Math.floor(pokemon.length / itemsPerPage)) {
        return;
      } else paginate(pageNumber + 1);
    } else if (action === "previous") {
      if (pageNumber === 0) {
        return;
      } else paginate(pageNumber - 1);
    } else {
      paginate(action);
    }
  };

  return (
    <div className="listingContainer">
      <Filter />
      <div className="cardContainer">
        {loading && <div class="loader"></div>}
        {currentItems?.map((pokemon) => (
          <Card
            key={pokemon.id}
            types={pokemon.types}
            name={pokemon.name}
            image={pokemon.image}
            shinyImage={pokemon.shinyImage}
          />
        ))}
      </div>
      {pokemon.length !== 0 && (
        <Paginate arr={pokemon} paginate={paginateHandler} itemsPerPage={12} />
      )}
    </div>
  );
};

export default Listing;
