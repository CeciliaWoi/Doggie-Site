const { Router } = require('express');
const router = Router();
const { getAllTemperaments } = require('../controllers/temperaments');


router.get('/', async (req,res) => {
    let temps = await getAllTemperaments();
    if(temps) {
        res.status(200).send(temps)
    } else {
        res.status(404).send('Temperaments not found!')
    }
})


module.exports = router;