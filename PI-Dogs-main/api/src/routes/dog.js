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
    
        // if (!name || !height_min || !height_max || !weight_min || !weight_max) {
        //     return res.status(400).send('Please, insert more info to continue!')
        // }
        // try {
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
            // console.log('TEMPERAMENTSSS BODYYY', temperament)
            // temperament.map(async (temp) => {
                // try {
                    const tempDb = await Temperament.findAll({
                        where: { 
                            name: temperament 
                        }
                    });
                    // console.log('TEMPSSSS DB FINDALL', tempDb)
                    dogCreated.addTemperaments(tempDb);
                    return res.send('The dog was created successfully!')     
                    // return ([...dogCreated, temperament]);
            // } catch(err) {
            //     next(err);
            // }
        // })
        // console.log('DOGGGG', dogCreated)
        // } catch(err) {
        //     next(err);
        // }  
        // let temperamentDb = await Temperament.findOne({
            //     where: { name: temperamentos }
            // });
            // dogCreated.addTemperaments(temperamentDb);    //???????????????
});


module.exports = router;