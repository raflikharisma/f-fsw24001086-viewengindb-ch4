const router = require('express').Router();
const CarsAdmin = require('./carsAdminRouter');
const Cars = require('./carsRouter');


router.use("/cars", CarsAdmin);
router.use("/api/v1/cars", Cars);

module.exports = router;