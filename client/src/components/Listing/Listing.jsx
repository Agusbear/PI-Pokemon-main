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

  useEffect(() => {
    dispatch(actions.getAllPokemon());
    dispatch(actions.getTypes());
    if (pokemon.length === 0) {
      setLoading(true);
    } else setLoading(false)

    setCurrentItems(pokemon.slice(pageNumber * 12, (pageNumber + 1) * 12));
  }, [pokemon]);

  const paginate = (pageNumber) => {
    setPageNumber(pageNumber);
    setCurrentItems(pokemon.slice(pageNumber * 12, (pageNumber + 1) * 12));
    setPageNumber(0);
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
        <Paginate arr={pokemon} paginate={paginate} itemsPerPage={12} />
      )}
    </div>
  );
};

export default Listing;
