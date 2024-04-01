const { Cars } = require('../models');

const carsPage = async(req,res) => {
    try {
        const cars = await Cars.findAll();
        res.render("cars/index.ejs",{
            cars
        })
    } catch (error) {
        
    }
}

module.exports = {
    carsPage
}