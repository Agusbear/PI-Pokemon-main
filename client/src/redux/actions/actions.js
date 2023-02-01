import axios from "axios";

export const GET_ALL_POKEMON = "GET_ALL_POKEMON";
export const GET_POKEMON_DETAIL_NAME = "GET_POKEMON_DETAIL_NAME";
export const CLEANUP_POKEMON_DETAIL = "CLEANUP_POKEMON_DETAIL";
export const GET_POKEMON_DETAIL_ID = "GET_POKEMON_DETAIL_ID";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const DELETE_POKEMON = "DELETE_POKEMON";
export const GET_TYPES = "GET_TYPES";
export const FILTER_POKEMON = "FILTER_POKEMON";

export const getAllPokemon = () => async (dispatch) => {
  return axios
    .get("http://localhost:3001/pokemons")
    .then((res) => dispatch({ type: GET_ALL_POKEMON, payload: res.data }));
};

export const getPokemonDetailName = (name) => async (dispatch) => {
  return axios
    .get("http://localhost:3001/pokemons/", {
      params: { name: name },
    })
    .then((res) => {
      dispatch({ type: GET_POKEMON_DETAIL_NAME, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: GET_POKEMON_DETAIL_NAME, payload: err });
    });
};

export const getPokemonDetailId = (id) => async (dispatch) => {
  return axios
    .get(`http://localhost:3001/pokemons/${id}`)
    .then((res) =>
      dispatch({ type: GET_POKEMON_DETAIL_ID, payload: res.data })
    );
};

export const getTypes = () => async (dispatch) => {
  return axios
    .get(`http://localhost:3001/types`)
    .then((res) => dispatch({ type: GET_TYPES, payload: res.data }));
};

export const createPokemon = (pokemon) => async (dispatch) => {
  return await axios
    .post("http://localhost:3001/pokemons", pokemon)
    .then((res) => {
      console.log(res.data);
      dispatch({ type: CREATE_POKEMON, payload: res.data }).catch((err) => {
        console.log(err);
      });
    });
};

export const filterPokemon = (query) => (dispatch) => {
  dispatch({ type: FILTER_POKEMON, payload: query });
};

export const cleanupPokemonDetail = () => (dispatch) => {
  dispatch({ type: CLEANUP_POKEMON_DETAIL, payload: {} });
};
