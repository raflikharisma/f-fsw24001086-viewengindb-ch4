const router = require("express").Router();

const CarsAdmin = require("../controllers/carsAdminController");


const upload = require("../middleware/uploader")


router.get("/", CarsAdmin.carsPage);
router.post("/admin/delete/:id", CarsAdmin.deleteCars);
router.get("/create", CarsAdmin.createCarsPage);
router.post('/admin/create',upload.array("photo"), CarsAdmin.createCars)
router.get("/edit/:id", CarsAdmin.editCarsPage);
router.post("/admin/edit/:id", CarsAdmin.editCars);
router.get("/small", CarsAdmin.smallPage);
router.get("/medium", CarsAdmin.mediumPage);
router.get("/large", CarsAdmin.largePage);

module.exports = router;
