const { Cars } = require("../models");

const imagekit = require("../lib/imagekit");
const multer = require("multer");

// Initialize ImageKit with your credentials
const multerStorage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb("null", "public/img/products");
  },
  filename: (req, res, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `products-${req.body.name}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
    cb(null, true);
  } else {
    return cb(new ApiError("Format Image nya salah", 400));
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadProductPhoto = upload.array("photo");

const carsPage = async (req, res) => {
  try {
    const cars = await Cars.findAll();
    res.render("cars/index.ejs", {
      cars,
      message: req.flash("message", ""),
      messageRemoved: req.flash("messageRemoved", ""),
    });
  } catch (error) {
    console.log(error);
  }
};

const createCarsPage = (req, res) => {
  try {
    res.render("cars/create.ejs");
  } catch (error) {
    console.log(error);
  }
};

const deleteCars = async (req, res) => {
  try {
    await Cars.destroy({
      where: {
        id: req.params.id,
      },
    });
    req.flash("messageRemoved", "Data berhasil dihapus");
    res.redirect("/cars");
  } catch (err) {
    res.render("error.ejs", {
      message: err.message,
    });
  }
};

const createCars = async (req, res) => {
  const { name, price, size } = req.body;
  const files = req.files;

  let images = [];

  try {
    if (files) {
      await Promise.all(
        files.map(async (file) => {
          const split = file.originalname.split(".");
          const extension = split[split.length - 1];

          const uploadedImage = await imagekit.upload({
            file: file.buffer,
            fileName: `IMG-${Date.now()}.${extension}`,
          });
          images.push(uploadedImage.url);
        })
      );
    }
    await Cars.create({
      name,
      price,
      size,
      photo: images,
    });
    req.flash("message", "Data berhasil disimpan");
    res.redirect("/cars");
  } catch (err) {
    console.log(err.message);
  }
};

const editCarsPage = async (req, res) => {
  try {
    const cars = await Cars.findByPk(req.params.id);

    res.render("cars/edit.ejs", {
      cars,
    });
  } catch (err) {
    console.log(err.message);
  }
};

const editCars = async (req, res) => {
  try {
    await Cars.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.redirect("/cars");
  } catch (err) {
    console.log(err);
  }
};

const smallPage = async (req, res) => {
  try {
    const cars = await Cars.findAll({
      where: {
        size: "small",
      },
    });
    res.render("cars/small.ejs", {
      cars,
    });
  } catch (error) {
    console.log(error);
  }
};
const mediumPage = async (req, res) => {
  try {
    const cars = await Cars.findAll({
      where: {
        size: "medium",
      },
    });
    res.render("cars/small.ejs", {
      cars,
    });
  } catch (error) {
    console.log(error);
  }
};
const largePage = async (req, res) => {
  try {
    const cars = await Cars.findAll({
      where: {
        size: "large",
      },
    });
    res.render("cars/small.ejs", {
      cars,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createCars,
  carsPage,
  deleteCars,
  createCarsPage,
  editCarsPage,
  editCars,
  smallPage,
  mediumPage,
  largePage,
};
