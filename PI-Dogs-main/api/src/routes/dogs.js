const { Router } = require('express');
const router = Router();
const { getAllDogs } = require('../controllers/dogs');


router.get('/', async (req, res) => {
    const { name } = req.query;
    let totalDogs = await getAllDogs();
        if(name) {
            let dogName = await totalDogs.filter(r => r.name.toLowerCase().includes(name.toLowerCase()));
            dogName.length ?
            res.status(200).send(dogName) :
            res.status(404).send('Dog not found!')
        } else {
            res.status(200).send(totalDogs);
        }
});


router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const totalDogs = await getAllDogs();
    if(id) {
        let dogId = await totalDogs.filter(r => r.id == id);
        dogId.length ?
        res.status(200).send(dogId) :
        res.status(404).send('Dog not found!')
    }
});


module.exports = router;