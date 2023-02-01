import axios from "axios";

export default async function apiSearch(name) {
  var data = {};
  await axios
    .get(`${process.env.REACT_APP_API_DOMAIN}pokemons/`, {
      params: { name: name },
    })
    .then((response) => {
      data = response;
    })
    .catch((err) => {
      if (err.response.status == 404) {
        throw new Error("Pokemon no encontrado");
      } else {
        console.log(err);
        throw new Error(err.message);
      }
    });
  return data;
}
