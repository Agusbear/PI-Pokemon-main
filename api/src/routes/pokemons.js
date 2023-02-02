const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const { Pokemon, Type } = require("../db");

router.get("/", async (req, res) => {
  const name = req.query.name;
  var dataResponse = {};
  if (name) {
    Pokemon.findOne({ where: { name: name }, include: Type }).then(
      async (response) => {
        if (response) {
          const typesArray = [];
          const statsArray = [
            {
              base_stat: response.hp,
              effort: 0,
              stat: {
                name: "hp",
                url: "https://pokeapi.co/api/v2/stat/1/",
              },
            },
            {
              base_stat: response.attack,
              effort: 0,
              stat: {
                name: "attack",
                url: "https://pokeapi.co/api/v2/stat/2/",
              },
            },
            {
              base_stat: response.defense,
              effort: 0,
              stat: {
                name: "defense",
                url: "https://pokeapi.co/api/v2/stat/3/",
              },
            },

            {
              base_stat: response.speed,
              effort: 0,
              stat: {
                name: "speed",
                url: "https://pokeapi.co/api/v2/stat/6/",
              },
            },
          ];
          response.types.forEach((type) => {
            typesArray.push({ type: { name: type.name } });
          });

          dataResponse.name = response.name;
          dataResponse.image = response.image;
          dataResponse.types = typesArray;
          dataResponse.id = response.id;
          dataResponse.stats = statsArray;
          dataResponse.height = response.height;
          dataResponse.weight = response.weight;
          dataResponse.shinyImage = response.image;
          res.status(200).json(dataResponse);
        } else {
          try {
            await axios
              .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
              .then((response) => {
                dataResponse.name = response.data.name;
                dataResponse.image =
                  response.data.sprites.other["official-artwork"].front_default;
                dataResponse.types = response.data.types;
                dataResponse.id = response.data.id;
                dataResponse.stats = response.data.stats;
                dataResponse.height = response.data.height;
                dataResponse.weight = response.data.weight;
                dataResponse.shinyImage =
                  response.data.sprites.other["official-artwork"].front_shiny;
                res.status(200).json(dataResponse);
              });
          } catch (error) {
            res.status(404).json({ error: error.message });
          }
        }
      }
    );
  } else {
    await axios
      .get(
        "https://pokeapi.co/api/v2/pokemon?limit=40&offset=" +
          Math.floor(Math.random() * 900)
      ) //returns list of pokemon
      .then(async (response) => {
        const pokeList = response.data.results;
        dataResponse.pokeList = pokeList;
        dataResponse.list = [];
        for (const pokemon of pokeList) {
          //parse all pokemon into a list with necessary data using object url
          await axios.get(pokemon.url).then((response) => {
            dataResponse.list.push({
              id: response.data.id,
              name: response.data.name,
              types: response.data.types,
              attack: response.data.stats[1]["base_stat"],
              shinyImage:
                response.data.sprites.other["official-artwork"].front_shiny,
              image:
                response.data.sprites.other["official-artwork"].front_default,
            });
          });
        }
      })
      .then(async () => {
        await Pokemon.findAll({ include: Type }).then((dbPokemon) => {
          for (const pokemon of dbPokemon) {
            const typesArray = [];
            pokemon.types.forEach((type) => {
              typesArray.push({ type: { name: type.name } });
            });

            dataResponse.list.push({
              id: pokemon.id,
              name: pokemon.name,
              types: typesArray,
              shinyImage: null,
              image: pokemon.image,
              attack: pokemon.attack,
            });
          }
          res.status(200).json(dataResponse.list);
        });
      });
  }
});

router.get("/:idPokemon", async (req, res) => {
  const id = req.params.idPokemon;
  const dataResponse = {};
  await axios
    .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((response) => {
      dataResponse.name = response.data.name;
      dataResponse.image =
        response.data.sprites.other["official-artwork"].front_default;
      dataResponse.types = response.data.types;
      dataResponse.id = response.data.id;
      dataResponse.stats = response.data.stats;
      dataResponse.height = response.data.height;
      dataResponse.weight = response.data.weight;
      dataResponse.shinyImage =
        response.data.sprites.other["official-artwork"].front_shiny;
      res.status(200).json(dataResponse);
    });
});

router.post("/", async (req, res) => {
  const { types } = req.body;
  await Pokemon.create(req.body)
    .then(async (created) => {
      types.forEach(async (type) => {
        await Type.findOne({ where: { name: type } }).then(async (data) => {
          await created.addType(data);
        });
      });
      res.status(200).json(created);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error.errors);
    });
});

module.exports = router;
