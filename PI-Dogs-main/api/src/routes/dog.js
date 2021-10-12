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
        temperaments
    } = req.body;
    
        if (!name || !height_min || !height_max || !weight_min || !weight_max) {
            return res.status(400).send('Please, insert more info to continue!')
        }
        
        try {
            let dogCreated = await Dog.create({
            name,
            height_min,
            height_max,
            weight_min,
            weight_max,
            life_span: life_span || 0,
            image,
            createdInDb
            });
                try {
                    const tempDb = await Temperament.findAll({
                        where: { 
                            name: temperaments 
                        }
                    });
                    dogCreated.addTemperaments(tempDb);
                    return res.send('The dog was created successfully!')     
                } catch(err) {
                    next(err);
                }
        } catch(err) {
             next(err);
        }  
});


module.exports = router;