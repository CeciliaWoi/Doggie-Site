const { getApiDogs } = require('./dogs');
const { Temperament } = require('../db');



const getAllTemperaments = async () => {
        const temperamentsApi = await getApiDogs();
        // console.log('QUE ONDA CON LA APIIII', temperamentsApi)
        const temperaments = temperamentsApi.map(e => e.temperaments).flat();
        // console.log('A VER LOS TEMPPPPSS', temperaments)
        temperaments.forEach(async (e) => {
          if(!(e === undefined)) {
            await Temperament.findOrCreate({
                where: { name: e.name},
            })
          };
        });
        const allTemperaments = await Temperament.findAll();
        return allTemperaments;
}



  module.exports = {
      getAllTemperaments
  }