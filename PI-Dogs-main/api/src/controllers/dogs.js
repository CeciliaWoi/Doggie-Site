require('dotenv').config();
const { Dog, Temperament } = require('../db');
const axios = require('axios');


const getApiDogs = async () => {
        const apiResponse = await axios.get(`https://api.thedogapi.com/v1/breeds`);
        const apiDogs = await apiResponse.data.map(e => {
            return {
                id: e.id,
                name: e.name,
                life_span: e.life_span,
                temperament: e.temperament ?
                             e.temperament?.split(', ').map((t) => {
                                 return {
                                     name: t,
                                 }
                             }) :
                             e.temperament, 

                image: e.image,
                height_min: e.height.metric.split(' -')[0],
                height_max: e.height.metric.split('- ')[1],
                weight_min: e.weight.metric.split(' -')[0],
                weight_max: e.weight.metric.split('- ')[1]
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

