const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const { Type } = require("../db.js");

router.get("/", async (req, res) => {
  const returnValue = []
  await axios.get("https://pokeapi.co/api/v2/type").then(async (response) => {
    const list = response.data.results
    
    for (const type of list) {
      await axios.get(type.url).then((indivResponse) => {
        returnValue.push(type.name)
        Type.findOrCreate({where: { id: indivResponse.data.id, name: type.name }});
      });
    }
  });
  res.status(200).json(returnValue);
});

module.exports = router;
