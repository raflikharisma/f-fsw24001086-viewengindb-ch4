const router = require('express').Router();

const CarsAdmin = require("../controllers/carsAdminController");

router.get('/', CarsAdmin.carsPage);





module.exports = router;