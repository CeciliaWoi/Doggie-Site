const { getApiDogs } = require('./dogs');
const { Temperament } = require('../db');



const getAllTemperaments = async () => {
        const temperamentsApi = await getApiDogs();
        const temperaments = temperamentsApi.map(e => e.temperaments).flat();
        temperaments.forEach(async (e) => {
          if(!(e === undefined)) {
            await Temperament.findOrCreate({
                where: { name: e.name},
            })
          };
        })
        const allTemperaments = await Temperament.findAll();
        return allTemperaments;
}



  module.exports = {
      getAllTemperaments
  }