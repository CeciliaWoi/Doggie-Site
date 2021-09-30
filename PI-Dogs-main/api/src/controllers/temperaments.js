const axios = require("axios");
const { getApiDogs } = require('./dogs');


const getAllTemperaments = async () {
        const allDogs = await getApiDogs();
}

  module.exports = {
      getAllTemperaments
  }