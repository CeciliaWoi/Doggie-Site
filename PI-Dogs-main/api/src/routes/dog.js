const { Router } = require('express');
const router = Router();
const { Dog, Temperament } = require('../db');


router.post('/', async (req, res) => {
    let {
        name,
        height_min,
        height_max,
        weight_min,
        weight_max,
        life_span,
        image,
        createdInDb,
        temperament
    } = req.body;

    let dogCreated = await Dog.create({
        name,
        height_min,
        height_max,
        weight_min,
        weight_max,
        life_span,
        image,
        createdInDb
    });

    console.log('TEMPERAMENTSSS TABLA', temperament)

    let temperamentDb = await Temperament.findAll({
        where: { name: temperament }
    });
    console.log('TEMPSSSS DB FINDALL', temperamentDb)
    dogCreated.addTemperament(temperamentDb);
    return res.send('The dog was created successfully!')
});


module.exports = router;