const router = require("express").Router();

const Cars = require("../controllers/carsController");

router.post("/", Cars.createCars);

module.exports = router;
