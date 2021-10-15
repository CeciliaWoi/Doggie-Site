require('dotenv').config();
const { Dog, Temperament } = require('../db');
const axios = require('axios');


const getApiDogs = async () => {
        const apiResponse = await axios.get(`https://api.thedogapi.com/v1/breeds`);
        const apiDogs = await apiResponse.data.map(e => {
            let heightMin = parseInt(e.height.metric.split(' -')[0]);
            let heightMax = parseInt(e.height.metric.split('- ')[1]);
            let weightMin = parseInt(e.weight.metric.split(' -')[0]); 
            let weightMax = parseInt(e.weight.metric.split('- ')[1]);
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
                height_min: !heightMin || heightMin === null ?
                            !heightMax || heightMax === null ?
                            0 :
                            heightMax - 1 :
                            heightMin,
                height_max: !heightMax || heightMax === null ?
                            !heightMin || heightMin === null ?
                            0 :
                            heightMin + 1 :
                            heightMax,    
                weight_min: !weightMin || weightMin === null ?
                            !weightMax || weightMax === null ?
                            0 :
                            weightMax - 1 :
                            weightMin,
                weight_max: !weightMax || weightMax === null ?
                            !weightMin || weightMin === null ?
                            0 :
                            weightMin + 1 :
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