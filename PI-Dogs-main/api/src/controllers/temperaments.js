const { getApiDogs } = require('./dogs');
const { Temperament } = require('../db');


const getAllTemperaments = async () => {
        const temperamentsApi = await getApiDogs();
        // console.log('TEMPSSS API', temperamentsApi);
        const temperaments = temperamentsApi.map (e => e.temperament)
        // console.log('TEMPERAMENTSSSS', temperaments)
        let temps = temperaments.map(e => {
          if(e == null) {
            return "";
          }
          return e.split(", ");
        }).flat();
        let orderedTemps = temps.sort();

        let tempsNoRepeat = [];

        orderedTemps.forEach(e => {
          if(tempsNoRepeat.indexOf(e) === -1) {
            tempsNoRepeat.push(e);
          }
        });
        // console.log('TEMPS NO REPEATTT', tempsNoRepeat)
        tempsNoRepeat.forEach(e => {
          if(e.length) {
            Temperament.findOrCreate({
              where: { name: e},
            });
          }
        });
        const allTemperaments = await Temperament.findAll();
        // console.log('TODOS LOS TEMPPPSSS EL ULTIMO ULTIMO', allTemperaments)
        return allTemperaments;
}

  module.exports = {
      getAllTemperaments
  }