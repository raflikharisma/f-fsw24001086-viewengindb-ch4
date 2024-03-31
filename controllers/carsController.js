const { Cars } = require("../models");

const createCars = async (req, res) => {
  const { name, photo, price, size } = req.body;
  try {
    const newCars = await Cars.create({
      name,
      photo,
      price,
      size,
    });

    res.status(200).json({
      status: "Success",
      data: {
        newCars,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { createCars };
