require('dotenv').config();
const { Dog, Temperament } = require('../db');
const axios = require('axios');


const getApiDogs = async () => {
        const apiResponse = await axios.get(`https://api.thedogapi.com/v1/breeds`);
        const apiDogs = await apiResponse.data.map(e => {
            let heightMin = e.height.metric.split(' -')[0];
            let heightMax = e.height.metric.split('- ')[1];
            let weightMin = e.weight.metric.split(' -')[0]; 
            let weightMax = e.weight.metric.split('- ')[1];
            return {
                id: e.id,
                name: e.name,
                life_span: e.life_span,
                temperaments: e.temperament ?
                             e.temperament?.split(', ').map((t) => {
                                 return {
                                     name: t,
                                 }
                             }) :
                             e.temperament, 
                image: e.image.url,
                height_min: heightMin === "NaN" || !heightMin ?
                            !heightMax || heightMax === "NaN" ?
                            "0" :
                            heightMax - 1 + "":
                            heightMin,
                height_max: heightMax === "NaN" || !heightMax ?
                            !heightMin || heightMin === "NaN" ?
                            "0" :
                            parseInt(heightMin) + 1 + "" :
                            heightMax,    
                weight_min: weightMin === "NaN" || !weightMin ?
                            !weightMax || weightMax === "NaN" ?
                            "0" :
                            weightMax - 1 + "":
                            weightMin,
                weight_max: weightMax === "NaN" || !weightMax ?
                            !weightMin || weightMin === "NaN" ?
                            "0" :
                            parseInt(weightMin) + 1 + "" :
                            weightMax
            };
        }); 
        return apiDogs;
};


const getDbDogs = async () => {
        const dbDogs = await Dog.findAll({
            include: {
                model: Temperament,
                attributes: ['name'],
                through: {
                    attributes: [],
                },
            }
        });
        return dbDogs;
};


const getAllDogs = async () => {
    const apiDogs = await getApiDogs();
    const dbDogs = await getDbDogs();
    const apiDbDogs = [...dbDogs, ...apiDogs];
    return apiDbDogs;
};

module.exports = {
    getApiDogs,
    getDbDogs,
    getAllDogs
}