const { getApiDogs } = require('./dogs');
const { Temperament } = require('../db');


const getAllTemperaments = async () => {
        const temperamentsApi = await getApiDogs();

        // console.log(temperamentsApi);

        const temperaments = temperamentsApi.map(e => e.temperament).flat();

        // console.log(temperaments)


        temperaments.forEach(async (e) => {
          // console.log(e)
          if(!(e === undefined)) {
          await Temperament.findOrCreate({
              where: { name: e.name},
            })
          };
        });

        const allTemperaments = await Temperament.findAll();
        // console.log('TODOS LOS TEMPPPSSS EL ULTIMO ULTIMO', allTemperaments)
        return allTemperaments;
        






        // // console.log('TEMPSSS API', temperamentsApi);
        // const temperaments = temperamentsApi.map (e => e.temperament)
        // // console.log('TEMPERAMENTSSSS', temperaments)
        // let temps = temperaments.map(e => {
        //   if(e == undefined) {
        //     return "";
        //   }
        //   return e.split(", ");
        // })
        
        // let orderedTemps = temps.flat().sort();

        // // let orderedTemps = tempsFlat.sort();

        // let tempsNoRepeat = [];

        // orderedTemps.forEach(e => {
        //   if(tempsNoRepeat.indexOf(e) === -1) {
        //     tempsNoRepeat.push(e);
        //   }
        // });
        // // console.log('TEMPS NO REPEATTT', tempsNoRepeat)

        // // const setDogs = new Set(orderedTemps);

        // // console.log('EL SEEEET', setDogs)

        // tempsNoRepeat.forEach(e => {
        //   if(e.length) {
        //     Temperament.findOrCreate({
        //       where: { name: e},
        //     });
        //   }
        // });
        // const allTemperaments = await Temperament.findAll();
        // // console.log('TODOS LOS TEMPPPSSS EL ULTIMO ULTIMO', allTemperaments)
        // return allTemperaments;
}

  module.exports = {
      getAllTemperaments
  }