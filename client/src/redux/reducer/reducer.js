import * as actions from "../actions/actions";

const initialState = {
  pokemon: [],
  pokemonDetail: {},
  types: [],
  filteredPokemon: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.GET_ALL_POKEMON:
      if (state.pokemon.length === payload.length) {
        return { ...state };
      } else
        return {
          ...state,
          pokemon: payload,
          filteredPokemon: payload,
        };

    case actions.GET_POKEMON_DETAIL_NAME:
      return { ...state, pokemonDetail: payload };

    case actions.CREATE_POKEMON:
      return { ...state, pokemonDetail: payload };

    case actions.GET_TYPES:
      if (state.types.length !== 0) {
        return { ...state };
      } else return { ...state, types: payload };

    case actions.CLEANUP_POKEMON_DETAIL:
      return { ...state, pokemonDetail: payload };

    case actions.FILTER_POKEMON:
      const {
        whichPokemon,
        types,
        typePokemon,
        orderPokemon,
        orderOptions,
        orderDirection,
      } = {
        ...payload,
      };
      let filteredPokemon = state.pokemon.filter((pokemon) => {
        let indivTypes = [];
        pokemon.types.forEach((typeElement) => {
          indivTypes.push(typeElement.type.name);
        });
        if (pokemon.id < 10000 && whichPokemon === "custom") {
          return false;
        }
        if (pokemon.id >= 10000 && whichPokemon === "official") {
          return false;
        }
        if (typePokemon) {
          return types.every((pokeType) => {
            return indivTypes.includes(pokeType);
          });
        }
        return true;
      });

      if (orderPokemon) {
        if (orderOptions === "id") {
          filteredPokemon.sort((a, b) => a.id - b.id);
          if (orderDirection === "descending") {
            filteredPokemon.reverse();
          }
        } else if (orderOptions === "attack") {
          filteredPokemon.sort((a, b) => {
            return a.attack - b.attack;
          });
          if (orderDirection === "descending") {
            filteredPokemon.reverse();
          }
        }
      }

      return { ...state, filteredPokemon: filteredPokemon };

    default:
      return { ...state };
  }
};

export default rootReducer;
